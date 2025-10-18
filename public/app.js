
    const form = document.getElementById('todoForm');
    const input = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const pendingCount = document.getElementById('pendingCount');
    const doneCount = document.getElementById('doneCount');

    function updateCounts() {
      const tasks = [...taskList.children];
      const doneTasks = tasks.filter(task => task.classList.contains('done')).length;
      const pendingTasks = tasks.length - doneTasks;
      pendingCount.textContent = `Pending: ${pendingTasks}`;
      doneCount.textContent = `Done: ${doneTasks}`;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskText = input.value.trim();
      if (!taskText) return;

      const li = document.createElement('li');
      li.className = 'task-item';
      li.textContent = taskText;

      const btnContainer = document.createElement('div');
      btnContainer.className = 'task-buttons';

      const doneBtn = document.createElement('button');
      doneBtn.className = 'done-btn';
      doneBtn.textContent = 'Done';
      doneBtn.addEventListener('click', () => {
        li.classList.toggle('done');
        updateCounts();
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        li.classList.add('deleting');
        li.addEventListener('animationend', () => {
          li.remove();
          updateCounts();
        }, { once: true });
      });

      btnContainer.appendChild(doneBtn);
      btnContainer.appendChild(deleteBtn);
      li.appendChild(btnContainer);
      taskList.appendChild(li);

      input.value = '';
      input.focus();
      updateCounts();
    });