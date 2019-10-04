import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule, MatCard, MatCardTitle } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import {CoursesCardListComponent} from './courses-card-list.component';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';


describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatDialogModule,
        RouterTestingModule
      ],
      declarations: [
        CoursesCardListComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesCardListComponent);
    component = fixture.componentInstance;
  });


  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should display the course list', () => {
    component.courses = setupCourses();
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.directive(MatCard));
    expect(cards.length).toEqual(Object.keys(COURSES).length);
  });


  it('should display the first course', () => {
    component.courses = setupCourses();
    fixture.detectChanges();

    const course = component.courses[0];
    const card = fixture.debugElement.query(By.css('.course-card:first-child'));
    const title = card.query(By.css('.mat-card-title'));

    expect(title.nativeElement.textContent).toBe(course.titles.description);
  });


});


