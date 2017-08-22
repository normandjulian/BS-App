import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reduceName' })
export class ReduceNamePipe implements PipeTransform {
    /**
     *
     * @param {any[]} array - Will be the Array of team to sort
     * @param {string} arg - will be the argument to sort (ex: 'score', 'made', ‘cashed'
     * @returns {TeamSM[]}
     */
    transform(lastname: string, limit: number): string {
        if (lastname.length > limit) {
            lastname = lastname.substring(0, (limit - 3)) + '...';
        }
        return lastname;
    }
}