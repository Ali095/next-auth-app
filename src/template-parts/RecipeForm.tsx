
import React, { useState, MouseEvent } from 'react';
import { RecipeFieldProps, SelectOption } from '../@types/typings';
import Icon from '../components/Icons/Icons';
import InputGroup from '../components/InputGroup/InputGroup';
import RecipeField from '../components/RecipeField/RecipeField';
import RecipeSection from '../components/RecipeSection/RecipeSection';
import Select from '../components/Select/Select';
import { jsOptions, paginationOptions, pauseOptions, scheduleOptions } from '../data/selectOptions';
import styles from '../../styles/template-parts/recipe-form.module.scss';


const RecipeForm = () => {
    const [showHidden, setShowHidden] = useState(false);
    const [recipeFields, setRecipeFields] = useState<RecipeFieldProps[]>([
        {
            id: 1,
            label: 'Title',
            value: '.content .title'
        }
    ]);

    const [scheduledOption, setScheduledOption] = useState<SelectOption | undefined>(scheduleOptions[0]);
    const [pauseOption, setPauseOption] = useState<SelectOption | undefined>(pauseOptions[0]);
    const [uniqueOption, setUniqueOption] = useState<SelectOption | undefined>(pauseOptions[0]);
    const [jsOption, setJsOption] = useState<SelectOption | undefined>(jsOptions[0]);
    const [pageOption, setPageOption] = useState<SelectOption | undefined>(paginationOptions[0]);

    const addRecipeFields = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const data: RecipeFieldProps = {
            id: Math.floor(Math.random() * Date.now()),
            label: '',
            value: ''
        }

        setRecipeFields((prev) => [...prev, data]);
    }

    const updateRecipeField = (data: RecipeFieldProps) => {
        const toBeUpdate = recipeFields.find(f => f.id === data.id);
    }

    const deleteRecipeField = (data: RecipeFieldProps) => {
        const updateFields = recipeFields.filter(f => f.id !== data.id);
        setRecipeFields(updateFields);
    }

    return (
        <div className={styles.container}>
            <RecipeSection
                title='Recipe Information'
                desc="Name your recipe and choose the URL you'd like to scrape"
            >
                <InputGroup id='recipe-name' label='Recipe Name'>
                    <input id='recipe-name' type="text" placeholder='Recipe name' />
                </InputGroup>

                <InputGroup label='URL' id='recipe-url' >
                    <input id='recipe-url' type="url" placeholder='URL' />
                </InputGroup>
            </RecipeSection>

            <RecipeSection
                title='Selected properties'
                desc='Name the data you selected to <a>extract</a>'
            >

                {recipeFields.map((field, idx) => (
                    <RecipeField
                        key={`field-${idx}`}
                        data={field}
                        updateField={updateRecipeField}
                        deleteField={deleteRecipeField}
                    />
                ))}

                <button
                    className={styles.addBtn}
                    style={{ maxWidth: 'max-content' }}
                    type='button'
                    onClick={addRecipeFields}
                >
                    <Icon name="plus" />
                    Add
                </button>
            </RecipeSection>

            <RecipeSection
                title='Page navigation'
                desc='Navigate single or multiple pages'
                style={{ marginBottom: 12 }}
            >
                <div className={styles.group}>
                    <Select
                        value={pageOption}
                        options={paginationOptions}
                        onChange={(o) => setPageOption(o)}
                    />
                </div>

                <div className={`${styles.hidden} ${pageOption?.value === 'css-xpath' ? styles.show : ''}`}>
                    <InputGroup label='Number of pages to scrape'>
                        <input type="number" min={0} max={100} defaultValue={0} />
                    </InputGroup>

                    <InputGroup label='Class Input'>
                        <input
                            type="text"
                            placeholder='.page.next'
                            defaultValue='.pagination .pagination-link.next' />
                    </InputGroup>
                </div>

                <div className={`${styles.hidden} ${pageOption?.value === 'regexp' ? styles.show : ''}`}>
                    <InputGroup label='Number of pages to scrape'>
                        <input type="number" min={0} max={100} defaultValue={0} />
                    </InputGroup>

                    <InputGroup label='Regexp'>
                        <input
                            type="text"
                            placeholder=''
                            defaultValue='' />
                    </InputGroup>
                </div>

                <div className={`${styles.hidden} ${pageOption?.value === 'page-number' ? styles.show : ''}`}>
                    <InputGroup label='Number of pages to scrape'>
                        <input type="number" min={0} max={100} defaultValue={0} />
                    </InputGroup>

                    <InputGroup label='Increment step'>
                        <input type="number" min={0} max={100} defaultValue={0} />
                    </InputGroup>

                    <InputGroup label='URL Input'>
                        <input type="url" />
                        <small>URL of the next page that contains the items of page number 2 e.g: http://example.com/page/2/</small>
                        <small>If this URL contains any numbers than 2, Please replace the page number by [page_number] so it will be http://example123.com/page/[page_number]/</small>
                    </InputGroup>
                </div>

                <div className={`${styles.hidden} ${pageOption?.value === 'infinite-scroll' ? styles.show : ''}`}>
                    <InputGroup label='Number of pages to scrape'>
                        <input type="number" min={0} max={100} defaultValue={0} />
                    </InputGroup>
                </div>
            </RecipeSection>

            <button
                onClick={() => setShowHidden(prev => !prev)}
                className={styles['hide-btn']}
            >Show advanced options</button>

            <div className={`${styles.hidden} ${showHidden ? styles.show : ''} `}>
                {/* <RecipeSection
                    title='Schedule'
                    desc='Optionally schedule to run automatically. See this guide'
                >
                    <Select
                        value={scheduledOption}
                        options={scheduleOptions}
                        onChange={(o) => setScheduledOption(o)}
                    />
                </RecipeSection> */}

                <RecipeSection
                    title='Pause'
                    desc='Number of seconds to wait after page loads. Simple scraper waits automatically so only required if troubleshooting'
                >

                    <Select
                        value={pauseOption}
                        options={pauseOptions}
                        onChange={(o) => setPauseOption(o)}
                    />
                    <small style={{ marginTop: '10px' }} >Automatic is recommended</small>
                </RecipeSection>

                <RecipeSection
                    title='Unique results key'
                    desc='Avoid duplicates by selecting a property to act as the unique key for scrape results. See this guide for when to use'
                >
                    <Select
                        value={uniqueOption}
                        options={pauseOptions}
                        onChange={(o) => setUniqueOption(o)}
                    />

                    <small style={{ marginTop: '10px' }} >Automatic is recommended</small>
                </RecipeSection>

                <RecipeSection
                    title='Use Javascript'
                    desc='Run full browser for websites requiring Javascript'
                >
                    <Select
                        value={jsOption}
                        options={jsOptions}
                        onChange={(o) => setJsOption(o)}
                    />

                    <small style={{ marginTop: '10px' }} >Yes is recommended</small>
                </RecipeSection>

                <RecipeSection
                    title='Cookies'
                    desc='Add cookies from your browser to access data behind a login. See this guide'
                >
                    <div className={styles.group}>
                        <label htmlFor="">Cookies Array</label>
                        <textarea></textarea>
                    </div>
                </RecipeSection>
            </div>

            <button
                className='btn__primary'
                style={{ maxWidth: 'max-content', marginLeft: '332px' }}
            >Create Recipe</button>
        </div>
    )
}

export default RecipeForm;
