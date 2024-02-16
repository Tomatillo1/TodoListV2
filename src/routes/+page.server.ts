import type { Actions } from './$types';
import type {Todo} from "$lib/models/Todo";
import {fail} from "@sveltejs/kit";

let tasks: Todo[] = []

export const actions: Actions = {
    formTask: async ({request}) => {
        const formData = await request.formData();
        const task = formData.get('task') as string;
        const id = crypto.randomUUID()
        const taskWithId: Todo = {
            taskName: task,
            idValue: id
        }
        if (task === '') {
            return fail(400, {error: true, message: 'Une tache est requise'});
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
