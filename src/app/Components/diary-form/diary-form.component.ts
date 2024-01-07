import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DiaryaDataService } from '../../shared/diary-data.component';
import { DiaryEntry } from '../../shared/diary-entry.model';

@Component({
  selector: 'app-diary-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './diary-form.component.html',
  styleUrl: './diary-form.component.css',
})
export class DiaryFormComponent implements OnInit {
  diaryForm: FormGroup;
  editMode = false;
  diaryEntry: DiaryEntry;
  paramId: string;
  constructor(
    private diaryDataService: DiaryaDataService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.has('id')) {
        this.editMode = true;
        this.paramId = paramMap.get('id')!;
        this.diaryEntry = this.diaryDataService.getDiaryEntry(this.paramId);
      } else {
        this.editMode = false;
      }
    });
    this.diaryForm = new FormGroup({
      date: new FormControl(this.editMode ? this.diaryEntry.date : null, [
        Validators.required,
      ]),
      entry: new FormControl(this.editMode ? this.diaryEntry.entry : null, [
        Validators.required,
      ]),
    });
  }
  onSubmit() {
    const newEntry = new DiaryEntry(
      '',
      this.diaryForm.value.date,
      this.diaryForm.value.entry
    );
    if (this.editMode) {
      newEntry.id = this.paramId;
      this.diaryDataService.onUpdateEntry(this.paramId, newEntry);
    } else {
      this.diaryDataService.onAddDiaryEntry(newEntry);
    }
    this.router.navigateByUrl('');
  }
}
