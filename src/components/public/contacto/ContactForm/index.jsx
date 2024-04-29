'use client';
import { useEffect, useState } from 'react';
import styles from './ContactForm.module.scss';
import { inputProps } from '@/components/consts';
import { validateFormValues } from '@/components/utils';
import { sendMail } from '@/services/mail';
import { Loader } from '@/components';
import toast from 'react-hot-toast';

const initialForm = {
	values: {
		name: '',
		phone: '',
		email: '',
		subject: '',
		message: '',
	},
	isLoading: false,
	errors: {},
};

export const ContactForm = () => {
	const [form, setForm] = useState(initialForm);
	const [touched, setTouched] = useState({});
	const { values, isLoading, errors } = form;

	const onBlur = ({ target }) =>
		setTouched({ ...touched, [target.name]: true });

	const handleChange = ({ target }) => {
		setForm({
			...form,
			values: {
				...form.values,
				[target.name]: target.value,
			},
		});
	};

	useEffect(() => {
		const valuesErrors = validateFormValues(values);
		setForm({ ...form, errors: valuesErrors });
	}, [values]);

	const handleSubmit = async e => {
		e.preventDefault();
		setForm({ ...form, isLoading: true });
		try {
			await sendMail(values);
			setForm(initialForm);
			setTouched({});
			toast.success('Correo enviado!');
		} catch (error) {
			console.error(error);
			toast.error(error.message);
			setForm({ ...form, isLoading: false });
		}
	};

	return (
		<form className={styles.Form} onSubmit={handleSubmit}>
			{inputProps.map(input => {
				const inputInvalid =
					errors[input.name] && touched[input.name] ? styles.invalid : '';

				return (
					<div key={`input-${input.id}`} className={styles.Form__inputGroup}>
						<label htmlFor={input.id}>
							{input.label}
							<span>*</span>
						</label>
						<input
							className={inputInvalid}
							name={input.name}
							id={input.id}
							placeholder={input.placeholder}
							value={values[input.name]}
							onChange={handleChange}
							onBlur={onBlur}
						/>
						{touched[input.name] ? (
							<span className={styles.errorMsg}>{errors[input.name]}</span>
						) : null}
					</div>
				);
			})}
			<div className={styles.Form__textArea}>
				<label htmlFor='idMessage'>
					Mensaje<span>*</span>
				</label>
				<textarea
					className={`${errors.message && touched.message ? styles.invalid : ''}`}
					name='message'
					id='idMessage'
					value={values.message}
					rows='5'
					onChange={handleChange}
					onBlur={onBlur}
				/>
				{touched.message ? (
					<span className={styles.errorMsg}>{errors.message}</span>
				) : null}
			</div>
			<button
				className={styles.Form__button}
				disabled={Object.keys(errors).length > 0 || isLoading}
			>
				{isLoading ? <Loader /> : 'Enviar'}
			</button>
		</form>
	);
};