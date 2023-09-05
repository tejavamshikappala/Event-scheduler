let eventInputElement=document.getElementById('eventInput')
let dateInputElement=document.getElementById('dateInput')
let eventErrorElement=document.getElementById('eventError')
let dateErrorElement=document.getElementById('dateError');
let ulElement=document.getElementById('ulElement')
let savebutton=document.getElementById('savebutton')
let buttonElement=document.getElementById('buttonEle')
function gettingArrayFromLocalStorage(){
    let stringifiedArray=localStorage.getItem('scheduledArray')
    let parsedArray=JSON.parse(stringifiedArray)
    if (parsedArray===null){
        return []
    }
    return parsedArray
}

let scheduledArray=gettingArrayFromLocalStorage()

let count=scheduledArray.length
savebutton.addEventListener('click',function(){
    localStorage.setItem('scheduledArray',JSON.stringify(scheduledArray))
})

function validating(){
    eventInputElement.addEventListener('blur',function(event){
        if (event.target.value===''){
            eventErrorElement.textContent='required'
        }
        else{
            eventErrorElement.textContent=''
        }

    })

    dateInputElement.addEventListener('blur',function(event){
        if (event.target.value===''){
            dateErrorElement.textContent='required'
        }
        else{
            dateErrorElement.textContent=''
        }
    })
}
validating()

function deletingFunction(deleteId){
    let deletingElement=document.getElementById(deleteId)
    ulElement.removeChild(deletingElement)
    let deleteElementIndex = scheduledArray.findIndex(function(eachOne) {
    let eachOneId =  eachOne.id;
    if (eachOneId === deleteId) {
        return true;
    } 
    else {
        return false;
    }
});

    scheduledArray.splice(deleteElementIndex, 1);
}

function headingEditFunction(id){
    let headingElementForEdit=document.getElementById(('heading'+id)) //accessing heading element to change event     
    headingElementForEdit.contentEditable = true;                   //making element available for editing
    headingElementForEdit.classList.add('border-enter')             

}

function paraEditFunction(id){
    let paraElement=document.getElementById(('para'+id));   //accessing paragraph element to change the date and time values
   
    let inputElementCalender=document.getElementById(('calender'+id)) //accessing input element to get values of date and time based on userinteraction

    inputElementCalender.classList.remove('displayingEditButton')
    inputElementCalender.onchange=function(event){
        let text=(event.target.value);
        let monthsArrayThatChanged=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']  
        let dateChanged=new Date(text)
        let changedMonth=dateChanged.getMonth()
        let changedFullMonth=monthsArrayThatChanged[changedMonth]
        let changedDateValue=dateChanged.getDate()
        let changedFormattedDate=(changedDateValue<10)?`0${changedDateValue}`:changedDateValue
        let changedYear=dateChanged.getFullYear()
        let changedHour=dateChanged.getHours()
        let changedFormattedHour=(changedHour<10)?`0${changedHour}`:changedHour
        let changedMinutes=  dateChanged.getMinutes()
        let changedFormattedMinutes=(changedMinutes<10)?`0${changedMinutes}`:changedMinutes
        let changedFormattedDateValue=`${changedFormattedDate}/${changedFullMonth}/${changedYear} - ${changedFormattedHour}:${changedFormattedMinutes}`
        paraElement.textContent=changedFormattedDateValue

        inputElementCalender.classList.add('displayingEditButton')
    }
  
    
    
}

function editingListFunction(id){
    let getButtonElement=document.getElementById(('button'+id))
    let listButtonElement=document.getElementById('edit'+id)
    let saveButtonElement=document.getElementById('save'+id)
    listButtonElement.classList.add('displayingEditButton')
    saveButtonElement.classList.remove('displayingEditButton');
    let paraButton=document.getElementById('paraButton'+id)
    getButtonElement.classList.remove('displayingEditButton')
    paraButton.classList.remove('displayingEditButton')
}

function savingFunction(id){
    let listButtonElement=document.getElementById('edit'+id)
    let saveButtonElement=document.getElementById('save'+id)
    let inputELementThatEditDate=document.getElementById('calender'+id)
    inputELementThatEditDate.classList.add('displayingEditButton')
    saveButtonElement.classList.add('displayingEditButton');
    listButtonElement.classList.remove('displayingEditButton')
    let headingElementForEdit=document.getElementById(('heading'+id))
    headingElementForEdit.classList.remove('border-enter')
    let getButtonElement=document.getElementById(('button'+id))
    headingElementForEdit.contentEditable = false;
    let indexValue=scheduledArray.findIndex(function(item){
        let itemId=item.id
        if (itemId===id){
            return true
        }
        else{
            return false
        }
    })

    scheduledArray[indexValue].event=(headingElementForEdit.textContent)
    console.log(scheduledArray[indexValue])

    getButtonElement.classList.add('displayingEditButton')
    let paraElement=document.getElementById(('para'+id));
    let paraEditButtonElement=document.getElementById(('paraButton'+id))
    let indexForPara=scheduledArray.findIndex(function(item){
        let itemId=item.id
        if (itemId===id){
            return true
        }
        else{
            return false
        }
    })

    scheduledArray[indexForPara].date=(paraElement.textContent)
    console.log(scheduledArray[indexForPara])
    paraEditButtonElement.classList.add('displayingEditButton')

}

function creatingList(scheduleObject){
  
    let scheduleID=scheduleObject.id                    //specified ID
    let liElement=document.createElement('li')          //created ListElement
    liElement.classList.add('liElement')                
    liElement.id=scheduleID
    ulElement.appendChild(liElement)

    let leftContainer=document.createElement('div')     //created a div element to specify it as a part of ListElement
    leftContainer.classList.add('left-container')
    liElement.appendChild(leftContainer)

    let rightContainer=document.createElement('div')    //created a div element to specify it as another part of ListElement
    liElement.appendChild(rightContainer)

    let firstContainerOfRightContainer=document.createElement('div')
    rightContainer.classList.add('right-container')
    rightContainer.appendChild(firstContainerOfRightContainer)

    let secContainerOfRightContainer=document.createElement('div')
    rightContainer.appendChild(secContainerOfRightContainer)

    let headerContainer=document.createElement('div')   //created a container to add headings(eventheading,eventname) element
    headerContainer.classList.add('for-direction')
    headerContainer.id=scheduleID
    leftContainer.appendChild(headerContainer)

    let eventName=document.createElement('h1');         //headingElement(eventheading)
    eventName.textContent='Event: '
    eventName.classList.add('specific-name','underline')
    headerContainer.appendChild(eventName)

    let headAndButtonContainer=document.createElement('div')
    headAndButtonContainer.classList.add('row-direction')
    headerContainer.appendChild(headAndButtonContainer)

    let headingElement=document.createElement('h1')
    headAndButtonContainer.appendChild(headingElement)    //main-heading ELement(with event)
    headingElement.textContent=scheduleObject.event;
    headingElement.classList.add('heading-event')
    headingElement.id='heading'+scheduleID

    let editHeadingButtonContainer=document.createElement('div') //container for button
    editHeadingButtonContainer.id='button'+scheduleID
    editHeadingButtonContainer.classList.add('displayingEditButton','margin-class')

    headAndButtonContainer.appendChild(editHeadingButtonContainer)

    editHeadingButtonContainer.onclick=function(){
        headingEditFunction(scheduleID)
}   
    let headingEditIcon=document.createElement('i')             //added an icon to activate editing option for eventname
    editHeadingButtonContainer.appendChild(headingEditIcon)
    headingEditIcon.classList.add('fa', 'fa-pencil','icon-style-head')



    let listEditButtonContainer=document.createElement('div')   //created container for ListElement edit button
    listEditButtonContainer.id='edit'+scheduleID
  //listEditButtonContainer.textContent='edit '
    firstContainerOfRightContainer.appendChild(listEditButtonContainer)

    listEditButtonContainer.onclick=function(){
        editingListFunction(scheduleID)
    }

    let listEditIcon = document.createElement("i");             //added an icon to activate editing option for entire ListElement
    listEditIcon.classList.add("fa", "fa-pencil-square-o",'icon-style');
    
    listEditButtonContainer.appendChild(listEditIcon);

    let saveButtonElement=document.createElement('button')      //added save button to save after editing.
    firstContainerOfRightContainer.appendChild(saveButtonElement)
    saveButtonElement.classList.add('displayingEditButton','save-button-class')
    saveButtonElement.textContent='save'
    saveButtonElement.id='save'+scheduleID

    saveButtonElement.onclick=function(){
        savingFunction(scheduleID)
    }

    let paraContainer=document.createElement('div')         //created a container to add a date and time of an event
    leftContainer.appendChild(paraContainer)
    paraContainer.classList.add('for-direction')

    let paraName=document.createElement('i')                  //added a calender-icon.
    paraName.classList.add('specific-name',"fa", "fa-calendar",'for-gap')
    paraContainer.appendChild(paraName)

    let paraInputButtonContainer=document.createElement('div')  
    paraInputButtonContainer.classList.add('row-direction')
    paraContainer.appendChild(paraInputButtonContainer)

    let paraElement=document.createElement('p')             //created a paragraph element to add date and time values
    paraInputButtonContainer.appendChild(paraElement)
    paraElement.classList.add('para-date')
    paraElement.textContent=scheduleObject.date
    paraElement.id='para'+scheduleID;

    let secParaElementForFormat=document.createElement('p')          //created a secPara element to specify the 24h-format.
    secParaElementForFormat.textContent='24h-format'
    
    secParaElementForFormat.classList.add('secPara-element')
    paraInputButtonContainer.appendChild(secParaElementForFormat)

    let inputElementForDate=document.createElement('input') // created an input element to edit the date and time
    inputElementForDate.type='datetime-local'
    inputElementForDate.value='';
    inputElementForDate.id='calender'+scheduleID
    inputElementForDate.classList.add('displayingEditButton','input-class-edit')
    leftContainer.appendChild(inputElementForDate)
    let paraEditButtonContainer=document.createElement('div')
    paraEditButtonContainer.id='paraButton'+scheduleID
    paraEditButtonContainer.classList.add('displayingEditButton','margin-class')
    paraInputButtonContainer.appendChild(paraEditButtonContainer)
    paraEditButtonContainer.onclick=function(){
        paraEditFunction(scheduleID)
}

    let paraIconEdit=document.createElement('i')    //added an icon to activate editing option for paragraph element(for input data and time values)
    paraEditButtonContainer.appendChild(paraIconEdit)
    paraIconEdit.classList.add('fa', 'fa-pencil','icon-style')

    let deleteButtonContainer=document.createElement('div') //added a container for deleting button
    deleteButtonContainer.classList.add('button-aligning')
    deleteButtonContainer.id=scheduleID;
    deleteButtonContainer.onclick=function(){
        deletingFunction(scheduleID)
    }
    secContainerOfRightContainer.appendChild(deleteButtonContainer)

    let deleteIcon = document.createElement("i");       //created a deleting button by using icon
    deleteIcon.classList.add("far", "fa-trash-alt",'icon-style');
    deleteButtonContainer.appendChild(deleteIcon);
}

buttonElement.addEventListener('click',function(event){
    validating()
    if ((eventInputElement.value==='')&&(dateInputElement.value==='')){
        eventErrorElement.textContent="*required"
    dateErrorElement.textContent="*required"
    }
    if (eventInputElement.value===''){
        eventErrorElement.textContent="*required"
    }
    else{
        eventErrorElement.textContent=''
    }
    if (dateInputElement.value===''){
        dateErrorElement.textContent="*required"
    }
    else{
        dateErrorElement.textContent=''
    }
    if((eventInputElement.value!=='')&&(dateInputElement.value!=='')){
        eventErrorElement.textContent=''
        dateErrorElement.textContent=''
        let dateInputElementValue=dateInputElement.value
        let monthsArray=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        let date=new Date(dateInputElementValue)
        let month=date.getMonth()
        let fullMonth=monthsArray[month]
        let dateValue=date.getDate()
        let formattedDate=(dateValue<10)?`0${dateValue}`:dateValue
        let year=date.getFullYear()
        let hour=date.getHours()
        let formattedHour=(hour<10)?`0${hour}`:hour
        let minutes=  date.getMinutes()
        let formattedMinutes=(minutes<10)?`0${minutes}`:minutes
        let formattedDateValue=`${formattedDate}/${fullMonth}/${year} - ${formattedHour}:${formattedMinutes} `
        let scheduleObject={event:eventInputElement.value,date:formattedDateValue}
        count=count+1
        scheduleObject.id=count
        creatingList(scheduleObject)
        scheduledArray.push(scheduleObject)
        eventInputElement.value=''
        dateInputElement.value=''
    }   
})

for (let each of scheduledArray){
    creatingList(each)
}