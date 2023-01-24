
//primero creamos la funcion madre de todo XD
const creemosUnCalendarioXd = ({year,locale}) =>{

        
const weekdays = [... Array(7).keys()];

    const el = document.querySelector('div'); //creamos esta variable global para poder trabajar con ella en distinto momento

const intlWeekDays = new  Intl.DateTimeFormat(locale, { weekday: 'short' });

document.getElementById('down').addEventListener('click', () =>{
    el.scrollTo({top: el.scrollTop + window.innerHeight, behavior: 'smooth'}); 
    //para pasar al siguente div al presionar el boton
});

//lo mismo del down lo aplocamos aca
document.getElementById('up').addEventListener('click', () =>{
    el.scrollTo({top: el.scrollTop - window.innerHeight, behavior: 'smooth'})
})


//para determinar los dias de la semana
const weekdaysNames = weekdays.map(weekDayIndex => {
    const date = new Date(2023,4,weekDayIndex + 1); //nos da especificamente los dias de cada semana(lun,mar,mier,ju,vi,sa,do) basado en el mes 4
    const weekDaysName = intlWeekDays.format(date);
    return weekDaysName;
});

//creamos la lista de los dias con sus nombre
const renderedWeekDays = weekdaysNames.map(weekDaysName => `<li class="day-name"> ${weekDaysName}</li>`).join('');




const months = [...Array(12).keys()] // nos crea un array de 12 digitos o elementos(length)
//Output: [0,1,2,3,4,5,6,7,8,9,10,11]

const intl = new  Intl.DateTimeFormat(locale, { month: 'long' });

//aca creamos los meses del año con su nombre
const calendario = months.map(monthKey => {

    const monthName = intl.format(new Date(year, monthKey));
    const nextMonthIndex = monthKey + 1;

    const daysOfMonth = new Date(year, nextMonthIndex,0).getDate(); //Para ontener la fecha de los meses del año(c/u de los dias)

    const startsOn = new Date(year, monthKey,1).getDay(); //Para obtener el dia de la semana en el que empieza cada mes

    return { //Llamamos a cada variablo como objeto
        monthName,  //creamos el objeto monrhName de arriba
        daysOfMonth,
        startsOn  //retornamos todo lo anterior
    };
})



//Aca insertamos el objeto de arriba y le anexamos el nombre de los meses y el año
const html = calendario.map(({daysOfMonth,monthName,startsOn})=> {

    const days = [...Array(daysOfMonth).keys()]; //creamos el div basado en el numeor de dias de la semana

    const firstDayAtribute = `class='first-day' style='--first-day-start: ${startsOn}' `;

    const rederedDAYS = days.map((day,index) => ` 
    <li ${index === 0 ? firstDayAtribute: ''}>${day + 1}</li>
    `).join(''); //muy importante el join despues de cada MAP ya que nos quita las comas que nos agg el map al colocar los elementos como string

    const tituloDelHtml = `<h1>${monthName} ${year}</h1>`;

    return `<div class='month'>
    ${tituloDelHtml} <ol> ${renderedWeekDays}
    ${rederedDAYS}</ol></div>
    `
}).join('');

    el.innerHTML = html;  //Por ultimo insertamos el html en el  div



}

creemosUnCalendarioXd({year: 2023, locale: 'en'}); //Aca le damos el calor a los parametros de la funcion madre XD