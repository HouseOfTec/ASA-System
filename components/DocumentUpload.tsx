import React, { useState, useCallback, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf.mjs';
import mammoth from 'mammoth';

// Set worker path for pdf.js, pointing to the CDN version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://esm.sh/pdfjs-dist@4.5.136/build/pdf.worker.mjs`;

interface DocumentUploadProps {
  onSuccess: (content: string, file: File) => void;
  onError: (message: string) => void;
  isLoading?: boolean;
}

const readTextFromFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event?.target?.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
};

const readArrayBufferFromFile = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event?.target?.result as ArrayBuffer);
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
};

const extractText = async (file: File): Promise<string> => {
    const fileName = file.name.toLowerCase();

    // Plain text files
    const textBasedExtensions = ['.txt', '.md', '.csv', 'json', '.xml'];
    if (textBasedExtensions.some(ext => fileName.endsWith(ext))) {
        try {
            return await readTextFromFile(file);
        } catch (error) {
            console.error(`Error reading text file ${fileName}:`, error);
            throw new Error(`Could not read the text file "${fileName}".`);
        }
    }

    // PDF files
    if (fileName.endsWith('.pdf')) {
        try {
            const arrayBuffer = await readArrayBufferFromFile(file);
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => ('str' in item ? item.str : '')).join(' ');
                fullText += pageText + '\n\n';
            }
            return fullText.trim();
        } catch (error) {
            console.error(`Error parsing PDF file ${fileName}:`, error);
            if (error instanceof Error && error.name === 'PasswordException') {
                 throw new Error(`Could not read the PDF "${fileName}" as it is password-protected.`);
            }
            throw new Error(`Failed to parse the PDF file "${fileName}". It may be corrupted.`);
        }
    }

    // DOCX files
    if (fileName.endsWith('.docx')) {
        try {
            const arrayBuffer = await readArrayBufferFromFile(file);
            const result = await mammoth.extractRawText({ arrayBuffer });
            return result.value;
        } catch (error) {
            console.error(`Error parsing DOCX file ${fileName}:`, error);
            throw new Error(`Failed to parse the DOCX file "${fileName}". It may be corrupted or in an unsupported format.`);
        }
    }
    
    // Unsupported .doc files
    if (fileName.endsWith('.doc')) {
        throw new Error(`Unsupported file type: The classic .doc format is not supported. Please use .docx instead.`);
    }

    // Fallback for other potential text files
    try {
      return await readTextFromFile(file);
    } catch {
      throw new Error(`Unsupported file type: Could not extract text from "${fileName}".`);
    }
};


export const DocumentUpload: React.FC<DocumentUploadProps> = ({ onSuccess, onError, isLoading }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const processFile = useCallback(async (file: File | null) => {
        if (!file) return;
        try {
            const content = await extractText(file);
            onSuccess(content, file);
        } catch (err) {
            console.error("Error processing file:", err);
            onError(err instanceof Error ? err.message : "An unknown error occurred while processing the file.");
        }
    }, [onSuccess, onError]);
    
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // Necessary to allow dropping
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };
    
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 w-full text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Upload a Document</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">Analyze .txt, .pdf, .docx, and other text-based files.</p>
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`p-10 border-2 border-dashed rounded-lg transition-colors duration-300 ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'}`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".txt,.pdf,.docx,.md,.csv,.json,.xml"
                />
                <div className="flex flex-col items-center">
                    <svg className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 15l2-2m0 0l2-2m-2 2v-7m-2 2l2 2" /></svg>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Drag & drop your file here</p>
                    <p className="text-gray-500 dark:text-gray-400 my-2">or</p>
                    <button
                        onClick={handleBrowseClick}
                        className="px-6 py-2 text-white font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                        disabled={isLoading}
                    >
                        Browse Files
                    </button>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">Real content extraction for .pdf, .docx, .txt, etc.</p>
                </div>
            </div>
        </div>
    );
};