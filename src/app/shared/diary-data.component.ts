import { Injectable } from '@angular/core';
import { DiaryEntry } from './diary-entry.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class DiaryaDataService {
  public maxId: string;
  constructor(private http: HttpClient) {}

  diarySubject = new Subject<DiaryEntry[]>();
  diaryEntries: DiaryEntry[] = [];
  onDelete(id: string) {
    console.log('called', id);
    this.http
      .delete<{ message: string }>('http://localhost:3000/remove-entry/' + id)
      .subscribe((jsonData) => {
        console.log(jsonData);
        this.getDiaryEntries();
      });
  }
  onAddDiaryEntry(diaryEntry: DiaryEntry) {
    this.http
      .post<{ message: string }>('http://localhost:3000/add-entry', diaryEntry)
      .subscribe((jsonData) => {
        console.log(jsonData);
        this.getDiaryEntries();
      });
  }
  onUpdateEntry(id: string, newEntry: DiaryEntry) {
    this.http
      .put<{ message: string }>(
        'http://localhost:3000/update-entry/' + id,
        newEntry
      )
      .subscribe((jsonData) => {
        console.log(jsonData.message);
        this.getDiaryEntries();
      });
  }
  getDiaryEntry(id: string) {
    const index = this.diaryEntries.findIndex((el) => {
      return el.id == id;
    });
    return this.diaryEntries[index];
  }
  getDiaryEntries() {
    this.http
      .get<{ diaryEntries: any[] }>('http://localhost:3000/diary-entries')
      .pipe(
        map((responseData) => {
          return responseData.diaryEntries.map(
            (entry: { date: string; entry: string; _id: string }) => {
              return { date: entry.date, entry: entry.entry, id: entry._id };
            }
          );
        })
      )
      .subscribe((updateResponse) => {
        console.log(updateResponse);
        this.diaryEntries = updateResponse;
        this.diarySubject.next(this.diaryEntries);
      });
  }
}
