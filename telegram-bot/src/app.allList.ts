export const allList = todos =>
	`Твой список задач: \n\n${todos
		.map(todo => ('№' + todo.id + ':' + ' ' + todo.name) + (todo.status ? '✅' : '🔘') + '' + '\n\n')
		.join('')}`
