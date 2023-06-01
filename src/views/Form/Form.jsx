import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDiets} from '../../redux/actions';
import axios from "axios";
import validate from "./validate";
import styles from "./Form.module.css"

const Form = () => {
    
    const defaultImage = 'https://i.pinimg.com/originals/cb/2b/e0/cb2be090018cba79cf346f322826dfea.jpg';
    const options = [];
    const [steps, setSteps] = useState([]);
    const [admitido, setAdmitido] = useState(false)
    const diets = useSelector(state => state.Diets);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getDiets())
    },[dispatch])

    const [form, setForm] = useState({
        title: '',
        summary: '',
        healthScore: 1,
        stepByStep: [],
        image: '' || defaultImage,
        Diets: []
    });

    const [errors, setErrors] = useState({
        title: '',
        summary: '',
        healthScore: '',
        stepByStep: '',
        image: '',
        Diets: ''
    })

    for (let i = 1; i <= 100; i++) {
        options.push(
        <option key={i} value={i}>
            {i}
        </option>
        );
    };

    const handleInputChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setForm({
            ...form,
            [property]: value
        })

        setErrors(validate({
            ...form,
            [property]: value
        }))
    };

    const handleSelectHS = (event) => {
        const value = Number(event.target.value);

        setForm({
            ...form,
            healthScore: value
        })
    };

    const handleSelectDiet = (event) => {
        const value = Number(event.target.value);
        const isChecked = event.target.checked;

        const newDiets = isChecked 
        ? [...form.Diets, value]
        : form.Diets.filter((dietId) => dietId !== value);

        
        setForm({
            ...form,
            Diets: newDiets,
        });
    
        setErrors(validate({
            ...form,
            Diets: newDiets,
        }));
    };
    
    const updateFormStepByStep = (newStepByStep) => {
        setForm({
            ...form,
            stepByStep: newStepByStep
        });
    
        setErrors(validate({
            ...form,
            stepByStep: newStepByStep
        }));
    }

    const handleAddStep = () => {
        const newStep = [...steps, ''];
        setSteps(newStep);

        const newFormStepByStep = [...form.stepByStep];
        updateFormStepByStep(newFormStepByStep);
    };

    const handleStepChange = (event, index) => {
        const newSteps = [...steps];
        newSteps[index] = event.target.value;
        setSteps(newSteps);
    
        const newFormStepByStep = [...form.stepByStep];
        newFormStepByStep[index] = event.target.value;
        updateFormStepByStep(newFormStepByStep);
    };

    const handleRemoveStep = (index) => {
        const newSteps = [...steps];
        newSteps.splice(index, 1);
        setSteps(newSteps);
    
        const newFormStepByStep = [...form.stepByStep];
        newFormStepByStep.splice(index, 1);
        updateFormStepByStep(newFormStepByStep);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        admitido === true && axios.post('/recipes', form)
        .then(res => alert('Recipe created successfully'))
        .catch(error => alert('Mandatory data is missing'))
        setAdmitido(false)
        setForm({
            title: '',
            summary: '',
            healthScore: 1,
            stepByStep: [],
            image: '' || defaultImage,
            Diets: []
        })
      };

    return(
        <div className={styles.mainContainer}>
            <div>
                <h1 className={styles.title}>Create Recipe</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className={styles.labels}>Title: </label>
                    <input type="text" placeholder="Title Recipe" name="title" className={styles.inputText} value={form.title} onChange={handleInputChange}/>
                    {errors.title && <span style={{color:'#FFCE13'}}>{errors.title}</span>}
                </div>
                <div>
                    <label className={styles.labels}>Summary: </label>
                    <textarea
                        rows="4"
                        cols="50"
                        placeholder="Summary..."
                        name="summary"
                        className={styles.inputText}
                        value={form.summary}
                        onChange={handleInputChange}
                    ></textarea>
                    {errors.summary && <span style={{color: '#FFCE13'}}>{errors.summary}</span>}
                </div>
                <div>
                    <label className={styles.labels}>Health Score: </label>
                    <select
                        name="healthScore"
                        id="numero"
                        className={styles.select}
                        value={form.healthScore}
                        onChange={handleSelectHS}>
                        <option value='' disabled='disabled'>--Select a value--</option>
                        {options}
                    </select>
                </div>
                <div>
                    <label className={styles.labels}>Step By Step: </label>
                    <button type="add" onClick={() => handleAddStep()} className={styles.button}>
                        Add Step
                    </button>
                    {steps.map((step, index) => (
                        <div key={index} className={styles.steps} value={form.stepByStep}>
                        <input
                            type="text"
                            className={styles.inputText}
                            placeholder={`Step ${index + 1}`}
                            value={step}
                            onChange={(event) => handleStepChange(event, index)}
                        />
                        <button type="delete" onClick={() => handleRemoveStep(index)} className={styles.button}>
                            x
                        </button>
                        </div>
                    ))}
                    {errors.stepByStep && <span style={{color:'#FFCE13'}}>{errors.stepByStep}</span>}
                </div>
                <div>
                    <label className={styles.labels}>Image: </label>
                    <input type="text" placeholder="URL Image" name="image" className={styles.inputText} value={form.image} onChange={handleInputChange}/>
                    {errors.image && <span style={{color:'#FFCE13'}}>{errors.image}</span>}
                </div>
                <div>
                    <label className={styles.labels}>Diets: </label>
                    {diets.map((diet) => (
                        <div key={diet.id} value={form.Diets} className={styles.inputCheck} onChange={handleSelectDiet}>
                        <input type="checkbox" name="diets" value={diet.id}/>
                        <label>{diet.name}</label>
                        </div>
                    ))}
                    {errors.Diets && <span style={{color:'#FFCE13'}}>{errors.Diets}</span>}
                </div>
                <div style={{marginBottom: '20px'}}>
                    <button bkey={2} onClick={() => {setAdmitido(true)}} className={styles.button} type="submit">CREATE RECIPE</button>
                </div>
            </form>
        </div>
    )
}

export default Form;