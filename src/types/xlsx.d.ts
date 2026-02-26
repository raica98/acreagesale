declare module 'xlsx' {
  export interface WorkBook {
    SheetNames: string[];
    Sheets: { [sheet: string]: any };
  }

  export interface WorkSheet {
    [cell: string]: any;
  }

  export const utils: {
    book_new(): WorkBook;
    aoa_to_sheet(data: any[][]): WorkSheet;
    book_append_sheet(workbook: WorkBook, worksheet: WorkSheet, name: string): void;
  };

  export function write(
    workbook: WorkBook,
    options: { bookType: string; type: string }
  ): any;
}

declare module 'file-saver' {
  export function saveAs(blob: Blob, filename: string): void;
}
