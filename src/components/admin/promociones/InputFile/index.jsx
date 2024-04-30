'use client';
import { useState } from 'react';
import styles from './InputFile.module.scss';
import { CheckCircle } from 'react-feather';
import { sendImage } from '@/services/files';
import toast from 'react-hot-toast';
import { Loader } from '@/components';

export const InputFile = () => {
	const [file, setFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleFileChange = event => {
		if (event.target.files && event.target.files.length > 0) {
			const image = event.target.files[0];

			if (image.type.includes('image')) {
				const reader = new FileReader();
				reader.readAsDataURL(image);
				setFile(image);
			}
		}
	};

	const handleUploadFile = async () => {
		setIsLoading(true);
		try {
			const formData = new FormData();
			formData.append('image', file);
			const res = await sendImage(formData);
			if (res.status === 400)
				throw new Error('Ocurrió un error al tratar de subir la imágen');
			toast.success('Imágen subida con éxito!');
			setFile(null);
		} catch (error) {
			console.error(error);
			toast.error(error.message);
			setFile(null);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.Container}>
			<label className={styles.FileUpload} htmlFor='file'>
				<div className={styles.FileUpload__icon}>
					{!file ? (
						<svg
							className={styles.uploadFile}
							xmlns='http://www.w3.org/2000/svg'
							fill=''
							viewBox='0 0 24 24'
						>
							<g strokeWidth='0' id='SVGRepo_bgCarrier'></g>
							<g
								strokeLinejoin='round'
								strokeLinecap='round'
								id='SVGRepo_tracerCarrier'
							></g>
							<g id='SVGRepo_iconCarrier'>
								{' '}
								<path
									fill=''
									d='M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z'
									clipRule='evenodd'
									fillRule='evenodd'
								></path>{' '}
							</g>
						</svg>
					) : (
						<CheckCircle
							className={styles.fileChecked}
							size={80}
							color='#06d6a0'
						/>
					)}
				</div>
				<div className={styles.FileUpload__text}>
					<span>
						{!file
							? 'Click para cargar imágen desde tu pc'
							: '¡Imágen cargada!'}
					</span>
				</div>
				<input
					className={styles.FileUpload__input}
					name='file'
					type='file'
					id='file'
					onChange={handleFileChange}
				/>
			</label>
			<button
				className={styles.BtnUpload}
				disabled={!file || isLoading}
				onClick={handleUploadFile}
			>
				{!isLoading ? 'Subir imágen' : <Loader />}
			</button>
		</div>
	);
};