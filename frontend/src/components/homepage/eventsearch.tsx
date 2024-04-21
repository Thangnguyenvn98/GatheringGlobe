import React, { useState, FormEvent } from 'react';

interface FormData {
    keyword: string
  }

const SearchByKeyword: React.FC = () => {
    
    const [formData, setFormData] = useState<FormData>({ keyword:'' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setFormData({ keyword: '' });
    };

    return (
        <form   className="flex formInput h-[40px] w-[600px] bg-white"
                onSubmit={handleSubmit}>
                <input 
                type="text"
                name="keyword"
                value={formData.keyword}
                onChange={handleChange}
                className = "p-4 text-green-800 w-full" 
                placeholder = "Input keyword"
                />
            <button type="submit">Submit</button>
        </form>   
    )
}

export default SearchByKeyword;