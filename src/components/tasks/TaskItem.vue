<template>
    <li class="list-group-item py-3">
        <div class="d-flex justify-content-start align-items-center" :class="completed" >
            <input class="form-check-input mt-0"
                type="checkbox"
                :checked="task.is_completed"
                @change="markTaskAsCompleted"
            />
            <!-- Changes value of isEditing to true when double clicking the element -->
            <div class="ms-2 flex-grow-1"
                title="Double click the text to edit or remove"
                @dblclick="isEditing = true"
            >
                <div class="relative" v-if="isEditing">
                    <!-- Sets isEditing value to false when escape key is pressed -->
                    <input class="editable-task" type="text"
                        v-model="task.name"
                        @keyup.esc="checkInput"
                        @keyup.enter="updateTask"
                        v-focus
                    />
                </div>
                <span v-else>{{ task.name }}</span>
            </div>
            <div class="task-date">24 Feb 12:00</div>
        </div>
        <!-- Listening to edit event from TaskActions.vue
        Will change value of isEditing to true
        Only show component when isEditing is false (not currently editing) -->
        <TaskActions :isEditingProps="isEditing"
            @edit="isEditing = true"
            @remove = "removeTask"
            v-if="!isEditing"
        />
    </li>
</template>

<script setup>
import {computed, ref} from "vue"
import TaskActions from "./TaskActions.vue";

const props = defineProps({
    task: Object
})

const emit = defineEmits(['update', 'remove', 'task_status_change'])

const isEditing = ref(false)

const completed = computed(() =>
    props.task.is_completed ? "completed" : ""
)

const checkInput = () => {
    if (props.task.name != ""){
        isEditing.value = false
    }
}

const updateTask = (event) => {
    if (props.task.name != ""){
        //set the value of updateTask to the value of task prop and sets a new
        //value for the name property from the input event
        const updatedTask = {
            ...props.task, name: event.target.value
        }
        isEditing.value = false
        emit('update', updatedTask)
    }
}

const markTaskAsCompleted = (event) => {
    if (props.task.name != ""){
        //set the value of updateTask to the value of task prop
        //sets the value of is_completed bool to the opposite value
        const updatedTask = {
            ...props.task, is_completed: !props.task.is_completed
        }
        emit('task_status_change', updatedTask)
    }
}

const removeTask = () => {

    if (confirm('Are you sure?')){
        emit('remove', props.task)
    }

}


//Defining a custom directive to show the cursor in the input element after double click
//This will be placed in the element as the v-focus tag
const vFocus = {
    mounted: (element) => element.focus()
}
</script>
