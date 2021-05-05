import JSZip from "jszip";

export function bytesToSize(bytes: number, decimals: number = 2): string {
    if (!bytes) return '0 Bytes';

    const k: number = 1024;
    const dm: number = decimals < 0 ? 0 : decimals;
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function noop(): void {}

export function calculateFilesSize(files: File[]): number {
    return Array.from(files).reduce((acc, file) => {
        if (!file.size) {
            return acc;
        }
        return acc + Number(file.size);
    }, 0)
}

export function checkForDICOMUploaded(pid: string): boolean {
    // here will be checked for DICOM uploaded
    return Boolean(pid);
}

export function makeZip(files: File[]): Promise<Blob> {
    const zip = new JSZip();

    files.forEach((file) => zip.file(file.name, file));

    return zip.generateAsync({type: "blob"});
}


//TODO: need definition!
export function getRootId(): string {
    return 'root';
}

//TODO: need definition!
export function getAcceptedFileTypes(): string[] {
    return ['.gif', '.jpg', '.jpeg', '.png'];
}

//TODO: need definition!
export function getIsMulti(): boolean {
    return true;
}
