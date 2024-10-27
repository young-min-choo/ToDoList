import { v4 as uuidV4 } from 'uuid'

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.getElementById("new-task-title") as HTMLInputElement | null;

const tasks: Task[] =  loadTasks()
tasks.forEach(addListItem)



// Events
form?.addEventListener("submit", e => {
  e.preventDefault()

  if (input?.value == "" || input?.value == null) return
  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  addListItem(newTask)
  tasks.push(newTask)
  saveTasks()
})




// functions
function addListItem(task: Task): void {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type = "checkbox"
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)

}

function saveTasks(): void {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  return JSON.parse(localStorage.getItem("TASKS") || '[]')
}

