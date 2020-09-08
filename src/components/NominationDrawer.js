import React from 'react'
import styles from '../styles/NominationDrawer.module.css'

export default function NominationDrawer({children, showNominations, setShowNominations}) {
    return (
        <aside className={`${styles['nomination-drawer']} ${showNominations ? styles['open'] : styles['closed'] }`} onClick={() => setShowNominations(prevState => !prevState)}>
            <div 
            className={styles['nomination-drawer-padding']}
            >
            <div className={styles['nomination-text']}>NOMINATIONS</div>

            {showNominations 
                ? 
            (children) 
                :
            (null)
            } 
            </div>
        </aside>
        )
}