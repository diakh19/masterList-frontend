import React from 'react'

export const PageBottom = (props) => {
    return (
        props.id ? <div className='bottom' ><button type="submit" className="btn btn-primary btn-lg" disabled={props.isSubmitting} style={{ marginRight: "25px" }}
        >Update</button> </div> : (<div className='bottom'>
            <button type="submit" className="btn btn-primary btn-lg" disabled={props.isSubmitting} style={{ marginRight: "25px" }}
            >Save</button>
            <button type="reset" className="btn btn-secondary btn-lg" onClick={props.reset} style={{ marginRight: "25px" }}>Reset</button> </div>)
    )
}
