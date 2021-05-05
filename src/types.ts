import React from "react";

export type UploadOptionsType = {
    multi: boolean,
    accept: string[],
    onUpload: (files: File[]) => void
}

export type UploadSnapshot = {
    bytesTransferred: number
    totalBytes: number
}

export type UploadError = {
    message: string
}

export type TaskOnTypes = {
    next: (snapshot: UploadSnapshot) => any
    error: (error: UploadError) => any
    complete: () => any
}

export type InputChangeType = React.ChangeEvent<HTMLInputElement>;
export type ButtonClickType = React.MouseEvent<HTMLButtonElement>
