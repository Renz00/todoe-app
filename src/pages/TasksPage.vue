<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <!-- Listening to an event (added)
                        in child component (AddTask.vue)-->
                    <!-- <AddTask @added="handleAddedTask"/> -->
                    <AddTask />
                    <!-- List of uncompleted tasks -->
                    <TaskCard :tasks="uncompletedTasks"
                        v-if="uncompletedTasks.length > 0"
                    />
                        <span class="text-center m-2" v-else><h6 v-if="showToggleCompletedBtn">No Uncompleted Tasks.</h6></span>
                    <!-- Toggle button -->
                    <div class="text-center my-3" v-if="showToggleCompletedBtn">
                        <!-- Change value of variable on button click -->
                        <button class="btn btn-sm btn-secondary" @click="showCompletedTasks = !showCompletedTasks">
                            <span v-if="!showCompletedTasks">Show completed</span>
                            <span v-else>Hide completed</span>
                        </button>
                    </div>
                    <!-- List of completed tasks -->
                    <TaskCard :tasks="completedTasks"
                        :show="completedTasksIsVisible && showCompletedTasks"
                    />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";

//import pinia components
import { storeToRefs } from "pinia";
import { useTaskStore } from '../stores/task-store'

import TaskCard from "../components/tasks/TaskCard.vue"
import AddTask from "../components/tasks/AddTask.vue"

//instatiating the store
const store = useTaskStore()

//Creating a reactive ref variable from tasks, completedTasks, uncompletedTasks variables inside task-store
//the name of the variable it the same as the object name in task-store
const { tasks, completedTasks, uncompletedTasks } = storeToRefs(store)
//You can do the same thing for actions inside task-store
const { fetchAllTasks } = store

onMounted(async ()=>{
    await fetchAllTasks()
})

//If there are tasks found, show button
const showToggleCompletedBtn = computed(() =>
    //If true = show, false = hide
    tasks.value.length > 0
)

//Determines if Completed Tasks are showing
const completedTasksIsVisible = computed(() =>
    completedTasks.value.length > 0
)

const showCompletedTasks = ref(false)

</script>
