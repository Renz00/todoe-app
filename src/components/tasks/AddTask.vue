<template>
    <div class="relative">
        <input type="text"
        class="form-control form-control-lg padding-right-lg"
        placeholder="+ Add new task. Press enter to save."
        @keydown.enter = "addNewTask"
    />
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useTaskStore } from '../../stores/task-store'

//instatiating the store
const store = useTaskStore()

//You can do the same thing for actions inside task-store
const { handleAddedTask } = store

//Using a reactive function because it will hold a Task object
const newTask = reactive({
    name: "",
    is_completed: false
})

//Using emit so that the parent component can listen to the event in child
const emit = defineEmits(['added'])

const addNewTask = async(event) => {
    //Checks if the event.target.value is not empty
    if (event.target.value.trim()){
        newTask.name = event.target.value
        event.target.value = ""

        //Assigning the newTask object to the emit
        // emit('added', newTask)
        //When calling a async function from store, use await
        //Then add async to the function containing the await call
        await handleAddedTask(newTask)
    }
}

</script>
