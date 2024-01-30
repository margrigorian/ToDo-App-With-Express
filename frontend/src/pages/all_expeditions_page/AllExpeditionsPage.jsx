import React, { useEffect, useState } from 'react';
import style from './AllExpeditionsPage.module.css';  
import { getAllExpeditionsList, updateExpedition, deleteExpeditionFromData } from '../../lib/request';  
import ModalWindow from '../../components/modal_window/ModalWindow';

export default function AllExpeditionsPage(prop) {
    const [expeditions, setExpeditions] = useState([]);
    const [page, setPage] = useState(1); // для request
    const [limit, setLimit] = useState(3); // для request
    const [pageNumbers, setPageNumbers] = useState([1]);
    const [action, setAction] = useState('getData');
    const [modalWindow, setModalWindow] = useState(false);
    const [expeditionID, setExpeditionID] = useState(null);
    const [redactedTitle, setRedactedTitle] = useState('');

    useEffect(() => {
        if(action === 'getData') {
            setAction(null);

            getAllExpeditionsList(prop.token, page, limit).then(arr => {
                if(arr.limitExpeditions) {
                    // для пагинации
                    const quentityOfPages = Math.ceil(arr.allExpeditions.length / limit);
                    console.log(quentityOfPages);
                    let numbersArr = [];
                    for(let i = 1; i <= quentityOfPages; i++) {
                        numbersArr.push(i);
                    }
                    
                    setPageNumbers(numbersArr);
                    setExpeditions(arr.limitExpeditions);
                }else {
                    setExpeditions(arr.AllExpeditions);
                }
            }).catch(err => console.log(err));
        }else if(action === 'changeTitle') {
            changeExpeditionInfo();
        }else if (action === 'deleteExpedition') {
            deleteExpedition();
        }
    }, [expeditions, action])

    async function changeExpeditionInfo() {
        setAction(null);
        
        if(redactedTitle) {
            expeditions.map(el => {
                if(el.id === expeditionID) {
                    el.title = redactedTitle;
                    return el;
                }else {
                    return el;
                }
            })

            const expedition = expeditions.find(el => el.id === expeditionID);
            await updateExpedition(prop.userId, prop.token, expedition);
            setRedactedTitle("");
        }

        setExpeditionID(null);
    }

    async function deleteExpedition() {
        setAction(null); // иначе происходит зацикленность

        const updatedExpeditions = expeditions.filter(el => el.id !== expeditionID);
        setExpeditions(updatedExpeditions);
        await deleteExpeditionFromData(prop.userId, prop.token, expeditionID);

        setExpeditionID(null);
    }


    return (
        <div className={style.fon}>
            {
                modalWindow ? 
                    <ModalWindow 
                        modalWindow={modalWindow}
                        setModalWindow={setModalWindow}
                        setExpeditionID={setExpeditionID}
                        setRedactedTitle={setRedactedTitle}
                        setAction={setAction}
                    /> : undefined
            }
            <div className={style.headerContainer}>
                <p className={style.headerText}>ALL EXPEDITIONS</p>
                <div className={style.pagination}>
                    {
                        pageNumbers.map(el => 
                            <div 
                                key={`id-${Math.random()}`}
                                className={style.page}
                                onClick={() => {
                                    setPage(el);
                                    setAction('getData');
                                }}
                            >
                                {el}
                            </div>
                        )
                    }
                </div>
            </div>
            {
                expeditions.length > 0 ? 
                    <div className={style.container}>
                        <div className={style.expeditionsContainer}>
                            {
                                expeditions.map(el => 
                                    prop.userId !== 0 ? 
                                        <div key={`ExpeditionID-${Math.random()}`} className={style.expedition}>
                                            <div className={style.title}>{el.title}</div>
                                            <button className={style.button}>READ</button>
                                        </div>
                                            :
                                        <div key={`ExpeditionID-${Math.random()}`} className={style.expedition}>
                                            <div className={style.expeditionsHeaderContainer}>
                                                <div className={style.title}>{el.title}</div>
                                                <div className={style.iconContainer}>
                                                    <div 
                                                        className={style.editIcon}
                                                        onClick={() => {
                                                            setExpeditionID(el.id);
                                                            setModalWindow(!modalWindow);
                                                        }}
                                                    ></div>
                                                    <div 
                                                        className={style.basket}
                                                        onClick={() => {
                                                            setExpeditionID(el.id);
                                                            setAction('deleteExpedition');
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <button className={style.button}>READ</button>
                                        </div>
                                )
                            }
                        </div>
                    </div>
                        : 
                    <div className={style.loading}>Loading...</div>
            }
        </div>
    )
}
