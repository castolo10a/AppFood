const regexTitle = /^[a-zA-Z\s]*$/;
const regexUrl = /\.(jpg|jpeg|png|gif)$/i;

export default function validate(form){
    let errors = {};

    if(!regexTitle.test(form.title)){
        errors.title = 'The title cannot contain numbers or special characters'
    }
    if(form.title === ""){
        errors.title = 'Enter a title'
    }
    if(form.summary === ""){
        errors.summary = 'Provide a summary or description'
    }
    if(!form.stepByStep.length){
        errors.stepByStep = 'Indicate at least one step to prepare the recipe'
    }
    if(form.stepByStep.length){
        for(let i = 0; i < form.stepByStep.length; i++){
            if(form.stepByStep[i] === ''){
                errors.stepByStep = 'This space cannot be empty'
            }
        }
    }
    if(!regexUrl.test(form.image)){
        errors.image = 'Provide a valid image URL'
    }
    if(!form.Diets.length){
        errors.Diets = 'Indicate at least one type of diet'
    }
    return errors;
}