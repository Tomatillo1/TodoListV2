<script lang="ts">
    import {page} from "$app/stores";
    import type {Todo} from "$lib/models/Todo";
    import {browser} from "$app/environment";
    import {onMount} from "svelte";

    let todos: Todo[] = [];
    let errorMessage = "";

    onMount(() => {
        taskOnLoad()
    })

    function taskOnLoad() {
        let todoTake = localStorage.getItem("key");
        if (todoTake != null)
        todos = JSON.parse(todoTake)
    }



    $: if ($page.form && $page.form.error) {
        errorMessage = $page.form.message
    }

    $: if ($page.form) {
        todos = $page.form;
    }

    $: if ($page.form && browser) {
        localStorage.setItem("key", JSON.stringify($page.form))
    }

</script>

<div class="global">
    <div class="menuBar">
        <h1>TODOLIST</h1>
        <form class="formTask" method="post" action="?/formTask">
            <label for="task">Une nouvelle tache ?</label>
            <div class="error-column">
                <div class="inputAndButton">
                    <input type="text" name="task" id="task" placeholder="Votre tache...">
                    <button class="add">Ajouter</button>
                </div>
                {#if (errorMessage)}
                    <p class="error">{errorMessage}</p>
                {/if}
            </div>
        </form>
    </div>
    <div class="toDo">
        {#each todos as todo}
            <div class="todos">
                <p class="todoName">{todo.taskName}</p>
                <form class="formDelete" method="post" action="?/delete">
                    <input type="hidden" name="id" value="{todo.idValue}">
                    <button class="delete">Supprimer</button>
                </form>
            </div>
        {/each}
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

    .global {
        width: 100%;
        height: 100%;
        padding-left: 2rem;
    }

    .menuBar {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 20%;
        gap: 1rem;
    }

    .toDo {
        width: 100%;
        height: 80%;
    }

    h1 {
        margin: 1rem 0 0 0;
        font-family: Poppins, sans-serif;
        font-size: 2rem;
        font-weight: 600;
        color: white;
        text-align: center;
    }

    label {
        color: white;
        font-family: Poppins, sans-serif;
        font-size: 1rem;
        font-weight: 400;
    }

    .formTask {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    #task {
        background-color: black;
        border: 1px solid white;
        color: white;
        padding: 0.5rem;
        font-family: Poppins, sans-serif;
        font-weight: 400;
        width: 20%;
    }

    .inputAndButton {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    .add, .delete {
        background-color: black;
        border: 1px solid white;
        color: white;
        padding: 0.5rem;
        font-family: Poppins, sans-serif;
        font-weight: 400;
        width: 10%;
    }

    .error {
        color: red;
        font-family: Poppins, sans-serif;
        font-weight: 400;
        font-style: italic;
        font-size: 0.75rem;
    }

    .error-column {
        display: flex;
        flex-direction: column;
    }

    .todos {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin-top: 1rem;
        width: 100%;
    }

    .todoName {
        color: white;
        border: 1px solid;
        width: 20%;
        padding: 0.5rem;
        margin: 0;
        font-family: Poppins, sans-serif;
        font-weight: 400;
        font-size: 0.75rem;
    }

    .formDelete {
        display: flex;
        flex-direction: row;
        width: 10%;
    }

    .delete {
        width: 100%;
    }
</style>