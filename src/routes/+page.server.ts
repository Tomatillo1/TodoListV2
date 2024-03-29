import type { Actions } from './$types';
import type {Todo} from "$lib/models/Todo";
import {fail} from "@sveltejs/kit";

let tasks: Todo[] = []

export const actions: Actions = {
    formTask: async ({request}) => {
        const formData = await request.formData();
        const task = formData.get('task') as string;
        const date = formData.get('date') as string;
        const time =formData.get('time') as string;
        const id = crypto.randomUUID()
        const taskWithId: Todo = {
            taskName: task,
            dateValue: date,
            timeValue: time,
            idValue: id
        }

        if (task === '' && date === '' && time === '') {
            return fail(400, {error: true, message: 'Tous les champs doivent être remplis'});
        }

        if (task === '') {
            return fail(400, {error: true, message: 'Une tache est requise'});
        }

        if (date === '') {
            return fail(400, {error: true, message: 'Une date est requise'});
        }

        if (time === '') {
            return fail(400, {error: true, message: 'Une heure est requise'});
        }

        tasks.push(taskWithId)
        return tasks
    },

    delete: async ({request}) => {
        const formData = await request.formData();
        const idName = formData.get('id') as string
        tasks = tasks.filter(task => task.idValue !== idName)
        return tasks
    }
}
