import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { COURSES, LESSONS, findLessonsForCourse } from '../../../../server/db-data';
import { Course } from '../model/course';
import { HttpErrorResponse } from '@angular/common/http';

describe('CoursesService', () => {

  let http: HttpTestingController;
  let service: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CoursesService
      ]
    });

    http = TestBed.get(HttpTestingController);
    service = TestBed.get(CoursesService);
  });

  afterEach(() => {
    http.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('findAllCourses', () => {

    it('should retrieve all courses', done => {
      service.findAllCourses().subscribe(res => {
        expect(res).toEqual(Object.values(COURSES));
        done();
      });

      const req = http.expectOne('/api/courses');
      expect(req.request.method).toEqual('GET');
      req.flush({
        payload: Object.values(COURSES)
      });
    });

  });

  describe('findCourseById', () => {
    it('should find a course by its id', done => {
      const id = +Object.keys(COURSES)[0];
      service.findCourseById(id).subscribe(res => {
        expect(res).toEqual(COURSES[id]);
        done();
      });

      const req = http.expectOne(`/api/courses/${id}`);
      expect(req.request.method).toEqual('GET');
      req.flush(COURSES[id]);
    });
  });

  describe('saveCourse', () => {

    let id: number;
    let update: Partial<Course>;

    beforeEach(() => {
      id = +Object.keys(COURSES)[0];
      update = {
        titles: {
          description: 'Testing'
        }
      };
    });

    it('should save a course', done => {
      service.saveCourse(id, update).subscribe(res => {
        expect(res).toEqual({
          ...COURSES[id],
          ...update
        });

        done();
      });

      const req = http.expectOne(`/api/courses/${id}`);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body.titles.description).toEqual(update.titles.description);
      req.flush({
        ...COURSES[id],
        ...update
      });
    });

    it('should return an error on failure', done => {
      service.saveCourse(id, update).subscribe(
        () => { fail(); },
        (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
          done();
        }
      );

      const req = http.expectOne(`/api/courses/${id}`);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body.titles.description).toEqual(update.titles.description);
      req.flush('Save failed', { status: 500, statusText: 'Internal Server Error' });

    });
  });

  describe('findLessons', () => {

    it('should find a list of lessons with default params', done => {
      const id = +Object.keys(COURSES)[0];

      service.findLessons(id).subscribe(lessons => {
        expect(lessons).toBeTruthy();
        expect(lessons.length).toBe(3);
        done();
      });

      // tslint:disable-next-line:no-shadowed-variable
      const req = http.expectOne(req => req.url === '/api/lessons');
      expect(req.request.method).toEqual('GET');
      expect(req.request.params.get('courseId')).toEqual(id.toString());

      req.flush({
        payload: findLessonsForCourse(id).slice(0, 3)
      });
    });

  });

});
