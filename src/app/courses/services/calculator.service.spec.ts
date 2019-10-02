import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {

  let logger: LoggerService;
  let calculator: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService, useValue: {
            log: jest.fn()
          }
        }
      ]
    });

    calculator = TestBed.get(CalculatorService);
    logger = TestBed.get(LoggerService);
  });

  it('should add 2 numbers', () => {
    const result = calculator.add(2, 2);

    expect(result).toBe(4);
    expect(logger.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract 2 numbers', () => {
    const result = calculator.subtract(2, 2);

    expect(result).toBe(0);
    expect(logger.log).toHaveBeenCalledTimes(1);
  });

});
