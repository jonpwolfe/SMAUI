import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currentDate',
  standalone: true,
})
export class CurrentDatePipe implements PipeTransform {
  transform(
    value?: Date | string, 
    format: 'full' | 'long' | 'medium' | 'short' = 'full', 
    includeTime: boolean = false // New parameter to include time
  ): string {
    const date = value ? new Date(value) : new Date(); // Use the provided date or the current date
    
    // Set formatting options for date and/or time
    const options: Intl.DateTimeFormatOptions = includeTime
      ? { dateStyle: format, timeStyle: format } // Include both date and time
      : { dateStyle: format }; // Date only

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}
