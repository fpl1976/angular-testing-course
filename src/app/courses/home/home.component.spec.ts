import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { CoursesService } from '../services/courses.service';
import { COURSES } from '../../../../server/db-data';
import { Course } from '../model/course';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';

describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;

  let service: CoursesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTabsModule,
        MatCardModule,
        MatDialogModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      declarations: [
        HomeComponent,
        CoursesCardListComponent
      ],
      providers: [
        { provide: CoursesService, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    service = TestBed.get(CoursesService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should display only beginner courses', () => {
    const beginner = Object
      .values(COURSES)
      .filter((c: Course) => c.category === 'BEGINNER') as Course[];

    service.findAllCourses = jest.fn(() => of(beginner));
    fixture.detectChanges();

    const tabs = fixture.debugElement.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(1);
    expect(tabs[0].nativeElement.textContent).toContain('Beginners');
  });


  it('should display only advanced courses', () => {
    const advanced = Object
      .values(COURSES)
      .filter((c: Course) => c.category === 'ADVANCED') as Course[];

    service.findAllCourses = jest.fn(() => of(advanced));
    fixture.detectChanges();

    const tabs = fixture.debugElement.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(1);
    expect(tabs[0].nativeElement.textContent).toContain('Advanced');
  });


  it('should display both tabs', () => {
    service.findAllCourses = jest.fn(() => of(Object.values(COURSES)));
    fixture.detectChanges();

    const tabs = fixture.debugElement.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(2);
  });


  it('should display advanced courses when tab clicked', fakeAsync(() => {
    service.findAllCourses = jest.fn(() => of(Object.values(COURSES)));
    fixture.detectChanges();

    const tabs = fixture.debugElement.queryAll(By.css('.mat-tab-label'));
    const advancedTab = tabs[1];

    advancedTab.triggerEventHandler('click', null);
    fixture.detectChanges();
    flush();

    const firstAdvanced = (Object.values(COURSES) as Course[]).find(c => c.category === 'ADVANCED');
    const titles = fixture.debugElement.queryAll(By.css('.mat-card-title'));
    expect(titles.length).toBeGreaterThan(0);
    expect(titles[0].nativeElement.textContent).toContain(firstAdvanced.titles.description);
  }));

});


