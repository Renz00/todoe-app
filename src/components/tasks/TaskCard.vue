<template>
    <div class="card mt-2" v-if="tasks.length && show">
        <ul class="list-group list-group-flush">
            <!-- When the updated event has been emitted from TaskItem component,
            It will create another emit with the name of updated and
            with the same payload of $event -->
            <TaskItem v-for="task in tasks"
                :task="task" :key="task.id"
                @update = "handleUpdatedTask"
                @task_status_change = "handleTaskStatusChange"
                @remove = "handleRemoveTask"
            />
            <!-- No payload was defined for the useTaskStore actions/methods
                since the emit in TaskItem was already sent with a payload -->
        </ul>
    </div>
</template>

<script setup>
import TaskItem from "./TaskItem.vue"
import { useTaskStore } from '../../stores/task-store'

const props = defineProps({
    tasks: Array,
    show: {
        type: Boolean,
        default:true
    }
})

//instatiating the store
const store = useTaskStore()

//You can do the same thing for actions inside task-store
const {
        handleUpdatedTask,
        handleTaskStatusChange,
        handleRemoveTask } = store



</script>
