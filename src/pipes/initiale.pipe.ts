import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'initiale' })
export class InitialePipe implements PipeTransform {
    /**
     *
     * @param {any[]} array - Will be the Array of team to sort
     * @param {string} arg - will be the argument to sort (ex: 'score', 'made', ‘cashed'
     * @returns {TeamSM[]}
     */
    transform(name: string): string {
        return name.charAt(0) + '.';
    }
}