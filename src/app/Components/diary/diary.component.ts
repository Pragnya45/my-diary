import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DiaryEntry } from '../../shared/diary-entry.model';
import { DiaryaDataService } from '../../shared/diary-data.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-diary',
  standalone: true, // Assuming you have a specific reason for using standalone, otherwise, you can remove this line
  imports: [MatTableModule, CommonModule],
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css'], // Corrected property name
})
export class DiaryComponent implements OnInit, OnDestroy {
  diaryEntries: DiaryEntry[];
  diarySubscription = new Subscription();

  constructor(
    private diaryDataService: DiaryaDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.diaryDataService.getDiaryEntries();
    this.diarySubscription = this.diaryDataService.diarySubject.subscribe(
      (diaryEntries) => {
        this.diaryEntries = diaryEntries;
        console.log(this.diaryEntries);
      }
    );
    this.diaryEntries = this.diaryDataService.diaryEntries;
    console.log(this.diaryEntries);
  }

  ngOnDestroy(): void {
    this.diarySubscription.unsubscribe();
  }
  onDelete(id: string) {
    this.diaryDataService.onDelete(id);
  }
  onEdit(id: string) {
    this.router.navigate(['edit', id]);
  }
}
