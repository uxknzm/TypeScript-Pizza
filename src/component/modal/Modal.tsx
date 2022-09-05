import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import s from './Modal.module.scss'

type ModaleProps = {
    handleClose: () => void
    open: boolean
    imageUrl: string
    title: string
    onClickAdd: () => void
    price: number
    addedCount: any
    rating: number
}

const Modale: React.FC<ModaleProps> = ({ handleClose, open, imageUrl, title, onClickAdd, price, addedCount, rating }) => {
    return (
        <Modal
            className={s.modal}
            open={open}
            onClose={handleClose}
        >
            <Box className={s.modalDialog}>
                <CardContent sx={{ marginRight: 10, width: 700, textAlign: 'center' }}>
                    <h1 className={s.title}>{title}</h1>
                    <p className={s.parag}>С другой стороны укрепление и развитие структуры обеспечивает участие в формировании систем массового участия. Таким образом реализация намеченных плановых заданий позволяет оценить значение новых предложений. Товарищи! постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет выполнять важные задания по разработке модели развития.
                        Разнообразный и богатый опыт консультация с широким активом обеспечивает широкому кругу. Равным образом рамки и место обучения кадров влечет за собой процесс внедрения и модернизации системы обучения кадров, соответствует насущным потребностям.
                        Идейные соображения высшего порядка, а также дальнейшее развитие различных форм деятельности позволяет оценить значение новых предложений. Идейные соображения высшего порядка, а также дальнейшее развитие различных форм деятельности позволяет оценить значение новых предложений.</p>

                    <div className="pizza-block__bottom">
                        <div className="pizza-block__price">от {price} ₽</div>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                        />
                        <button onClick={onClickAdd} className="button button--outline button--add" >
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                    fill="white"
                                />
                            </svg>
                            <span>Добавить</span>
                            {addedCount > 0 && <i>{addedCount}</i>}
                        </button>
                    </div>
                </CardContent>
                <CardMedia
                    sx={{ width: 400 }}
                    component="img"
                    image={imageUrl}
                    alt="Live from space album cover"
                />
            </Box>
        </Modal>
    );
};

export default Modale;