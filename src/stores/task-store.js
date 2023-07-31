import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { allTasks, createTask, updateTask, changeTaskStatus, removeTask} from "../http/task-api"


//Alternate way of defining task store properties
// export const useTaskStore = defineStore('taskStore', {
//     state: () => ({
//         tasks: [],
//         task: {
//             id: 1,
//             name: "First task",
//             is_completed: false
//         }
//     }),
//     getters: {
//         //Filter all completed tasks using condition and return the filtered value
//         completedTasks (){
//             return this.tasks.filter(task =>task.is_completed)
//         },
//         uncompletedTasks (){
//             return this.tasks.filter(task => !task.is_completed)
//         }
//     },
//     actions: {
//         async fetchAllTasks (){
//             //Place api response to data variable
//             //Then pass data values to tasks state
//             const {data} = await allTasks()
//             this.tasks = data.data
//         }
//     }
// })

export const useTaskStore = defineStore('taskStore', () => {

    const tasks = ref([])

    //Use reactive for Objects
    // const task = reactive({
    //     id: null,
    //     name: null,
    //     is_completed: false
    // })

    //Filter all completed tasks using condition and return the filtered value
    const completedTasks = computed(() => {
        return tasks.value.filter(task => task.is_completed)
    })

    const uncompletedTasks = computed(() => {
        return tasks.value.filter(task => !task.is_completed)
    })

    const fetchAllTasks = async() => {
        //Place api response to data variable
        //Then pass data values to tasks state
        const {data} = await allTasks()
        tasks.value = data.data
    }

    const handleAddedTask = async (newTask) => {
        //Call the createTask method in the task-api.js file for api
        //Rename data to createdTask
        const {data: createdTask} = await createTask(newTask)

        //Adding the newly added task to the beginning of task array
        //so that it will show in the list as the latest addition to the tasks
        //without calling the api again
        tasks.value.unshift(createdTask.data)
    }

    //Changed event payload name to task
    const handleUpdatedTask = async (task) => {
        const {data: updatedTask} = await updateTask(task.id, task)
        //Get the value of the current taskk from the tasks array,
        //then replacing the old name with the updated name
        const currentTask = tasks.value.find(item => item.id == task.id)
        currentTask.name = updatedTask.data.name
    }

    const handleTaskStatusChange = async (task) => {
        const {data: updatedTask} = await changeTaskStatus(task.id, {
            is_completed: task.is_completed
        })
        //Get the value of the current taskk from the tasks array,
        //then replacing the old name with the updated name
        const currentTask = tasks.value.find(item => item.id == task.id)
        currentTask.is_completed = updatedTask.data.is_completed
    }

    const handleRemoveTask = async (task) => {
        const {data: result} = await removeTask(task.id)
        if (result){
            //find index of task to be removed
            const taskIndex = tasks.value.findIndex(item => item.id == task.id)
            //remove only 1 index from tasks.value array
            tasks.value.splice(taskIndex, 1)

        }
    }

    return {
        tasks,
        completedTasks,
        uncompletedTasks,
        fetchAllTasks,
        handleAddedTask,
        handleUpdatedTask,
        handleTaskStatusChange,
        handleRemoveTask
    }
})
