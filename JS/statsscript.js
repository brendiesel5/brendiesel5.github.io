//accesses samples1.json, sets json_data variable to samples1.json
// defines a function that takes in samples1 as json data
$.getJSON("sampledata/samples1.json", function (json_data){
	//album_dict key = album name, value = array of quantity of samples for dates
	let album_dict = {"all":[]};
	//genre_dict key = album_name, value = dictionary containing each genre's quantities
	let genre_dict = {};
	let type_dict = {};
	//sets all dates in the array of album_dict for samples to 0
	for (let i=0; i<12; i++)
	{
		album_dict["all"].push(0);
	}
	//key is album_name, value = array of dictionaries of samples
	//first name is key second name is value in tuples of json_data
	//example of key: "Graduation:Good Morning"
	//example of value: array of all of  "Sample": "Someone Saved My Life Tonight" contains dictionaries
	for (const [key, value] of Object.entries(json_data)) {
		//gets album title from key
		let album_name = key.split(":")[0];
		//if album_name not in album_dict set all to 0 to replace
		if (!album_dict.hasOwnProperty(album_name))
		{
			album_dict[album_name] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		}
		//loops through each dictionary
		for (let i=0; i<value.length; i++)
		{
			//changes the value in date to a index for the array
			let arr_pos = Math.floor((parseInt(value[i]["Date"].slice(-4))-1960)/5);
			if (arr_pos < 0)
			{
				arr_pos=0;
			}
			//increases the index in the array for that album
			album_dict[album_name][arr_pos]++;
			//also increasing the index for the "all" section of the dictionary
			album_dict["all"][arr_pos]++;
			//Getting the name of the genre for that sample
			let genre = value[i]["Genre"].slice(7);
			// creates empty dictionary if not in genre_dict for that album
			if (!genre_dict.hasOwnProperty(album_name))
			{
				genre_dict[album_name] = {};
			}
			//sets genre quantity to 0
			if (!genre_dict[album_name].hasOwnProperty(genre))
			{
				genre_dict[album_name][genre] = 0;
			}
			//increments type quantity
			genre_dict[album_name][genre]++;
			//type section
			let type = value[i]["Type"].slice(18);
			// creates empty dictionary if not in type_dict for that album
			if (!type_dict.hasOwnProperty(album_name))
			{
				type_dict[album_name] = {};
			}
			//sets type quantity to 0
			if (!type_dict[album_name].hasOwnProperty(type))
			{
				type_dict[album_name][type] = 0;
			}
			//increments type quantity
			type_dict[album_name][type]++;
		}
	}
	let data_sets = [];
	for (const [key, value] of Object.entries(album_dict)) {
		data_sets.push({
			label: key + ' # Sampled',
			data: album_dict[value],
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: 'rgb(255, 99, 132)',
			borderWidth: 1,
			stack: "Stack 0"
			
		})
	}
	const ctx = document.getElementById('myChart');
	const myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ['<1964', '1965-1969', '1970-1974', '1975-1979', '1980-1984', '1985-1989', '1990-1994', '1995-1999', '2000-2004', '2005-2009', '2010-2014', '2015-2019'],
			datasets: [
			// 	{
			// 	label: 'All Samples',
			// 	data: album_dict['all'],
			// 	backgroundColor: 'rgb(255, 99, 132)',
			// 	borderColor: 'rgb(255, 99, 132)',
			// 	borderWidth: 1,
			// 	stack: "Stack 0"
				
			// },
			{
				label: 'The College Dropout',
				data: album_dict['The College Dropout'],
				backgroundColor: 'rgb(130, 90, 30)',
				borderColor: 'rgb(130, 90, 23)',
				borderWidth: 1,
				stack: "Stack 0"
			},
			{
				label: 'Late Registration',
				data: album_dict['Late Registration'],
				backgroundColor: 'rgb(70, 40, 10)',
				borderColor: 'rgb(70, 40, 10)',
				borderWidth: 1,
				stack: "Stack 0"
				
			},
			{
				label: 'Graduation',
				data: album_dict['Graduation'],
				backgroundColor: 'rgb(200, 50, 200)',
				borderColor: 'rgb(200, 50, 200)',
				borderWidth: 1,
				stack: "Stack 0"
				
			},
			{
				label: '808s & Heartbreak',
				data: album_dict['808s & Heartbreak'],
				backgroundColor: 'rgb(220, 220, 230)',
				borderColor: 'rgb(220, 220, 230)',
				borderWidth: 1,
				stack: "Stack 0"
				
			},
			{
				label: 'My Beautiful Dark Twisted Fantasy',
				data: album_dict['My Beautiful Dark Twisted Fantasy'],
				backgroundColor: 'rgb(255, 20, 20)',
				borderColor: 'rgb(255, 20, 20)',
				borderWidth: 1,
				stack: "Stack 0"
				
			},
			{
				label: 'The Life Of Pablo',
				data: album_dict['The Life Of Pablo'],
				backgroundColor: 'rgb(250, 130, 30)',
				borderColor: 'rgb(250, 130, 30)',
				borderWidth: 1,
				stack: "Stack 0"
				
			},
			{
				label: 'ye',
				data: album_dict['ye'],
				backgroundColor: 'rgb(50, 70, 140)',
				borderColor: 'rgb(50, 70, 140)',
				borderWidth: 1,
				stack: "Stack 0"
				
			},
			{
				label: 'Jesus Is King',
				data: album_dict['Jesus Is King'],
				backgroundColor: 'rgb(11, 40, 221)',
				borderColor: 'rgb(50, 70, 190)',
				borderWidth: 1,
				stack: "Stack 0"
				
			}
		],
			
		},
		options: {
			chartArea: {
				backgroundColor: 'rgba(255, 255, 255)'
			},
			scales: {
				y: {
					beginAtZero: true
				}
			}
		},
		scales: {
			x:{
				stacked:true,
			},
			y:{
				stacked:true
			}
		},
		responsive: true,
		interaction: {
			intersect: false,
		},
		
	});


	//Genre
	const ctx2 = document.getElementById('myChart2');
	const myChart2 = new Chart(ctx2, {
		type: 'bar',
		data: {
			labels: ['hiphop', 'soul', 'jazz', 'R&B', 'dance', 'pop', 'classical', 'gospel', 'rock'],
			datasets: [
				{
					label: 'The College Dropout',
					data: genre_dict['The College Dropout'],
					backgroundColor: 'rgb(110, 70, 20)',
					borderColor: 'rgb(110, 70, 20)',
					borderWidth: 1,
					stack: "Stack 0"
				},
				{
					label: 'Late Registration',
					data: genre_dict['Late Registration'],
					backgroundColor: 'rgb(70, 40, 10)',
					borderColor: 'rgb(70, 40, 10)',
					borderWidth: 1,
					stack: "Stack 0"
					
				},
				{
					label: 'Graduation',
					data: genre_dict['Graduation'],
					backgroundColor: 'rgb(200, 50, 200)',
					borderColor: 'rgb(200, 50, 200)',
					borderWidth: 1,
					stack: "Stack 0"
					
				},
				{
					label: 'My Beautiful Dark Twisted Fantasy',
					data: genre_dict['My Beautiful Dark Twisted Fantasy'],
					backgroundColor: 'rgb(255, 20, 20)',
					borderColor: 'rgb(255, 20, 20)',
					borderWidth: 1,
					stack: "Stack 0"
					
				},
				{
					label: '808s & Heartbreak',
					data: genre_dict['808s & Heartbreak'],
					backgroundColor: 'rgb(220, 220, 230)',
					borderColor: 'rgb(220, 220, 230)',
					borderWidth: 1,
					stack: "Stack 0"
					
				},
				{
					label: 'The Life Of Pablo',
					data: genre_dict['The Life Of Pablo'],
					backgroundColor: 'rgb(250, 130, 30)',
					borderColor: 'rgb(250, 130, 30)',
					borderWidth: 1,
					stack: "Stack 0"
					
				}
			
		],
			
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		},
		scales: {
			x:{
				stacked:true,
			},
			y:{
				stacked:true
			}
		},
		responsive: true,
		interaction: {
			intersect: false,
		},
		
	});

	//Type
	const ctx3 = document.getElementById('myChart3');
	const myChart3 = new Chart(ctx3, {
		type: 'bar',
		data: {
			labels: ['Instrumental + Vocals', 'Instrumental', 'Vocals', 'Drums', 'Lyrics'],
			datasets: [
				{
					label: 'The College Dropout',
					data: type_dict['The College Dropout'],
					backgroundColor: 'rgb(110, 70, 20)',
					borderColor: 'rgb(110, 70, 20)',
					borderWidth: 1,
					stack: "Stack 0"
				},
				{
					label: 'Late Registration',
					data: type_dict['Late Registration'],
					backgroundColor: 'rgb(70, 40, 10)',
					borderColor: 'rgb(70, 40, 10)',
					borderWidth: 1,
					stack: "Stack 0"
					
				},
				{
					label: 'Graduation',
					data: type_dict['Graduation'],
					backgroundColor: 'rgb(200, 50, 200)',
					borderColor: 'rgb(200, 50, 200)',
					borderWidth: 1,
					stack: "Stack 0"
					
				},
				{
					label: '808s & Heartbreak',
					data: type_dict['808s & Heartbreak'],
					backgroundColor: 'rgb(220, 220, 230)',
					borderColor: 'rgb(220, 220, 230)',
					borderWidth: 1,
					stack: "Stack 0"
					
				},
				{
					label: 'My Beautiful Dark Twisted Fantasy',
					data: type_dict['My Beautiful Dark Twisted Fantasy'],
					backgroundColor: 'rgb(255, 20, 20)',
					borderColor: 'rgb(255, 20, 20)',
					borderWidth: 1,
					stack: "Stack 0"
					
				},
				{
					label: 'The Life Of Pablo',
					data: type_dict['The Life Of Pablo'],
					backgroundColor: 'rgb(250, 130, 30)',
					borderColor: 'rgb(250, 130, 30)',
					borderWidth: 1,
					stack: "Stack 0"
					
				}
				
			
		],
			
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		},
		scales: {
			x:{
				stacked:true,
			},
			y:{
				stacked:true
			}
		},
		responsive: true,
		interaction: {
			intersect: false,
		},
		
	});
})





