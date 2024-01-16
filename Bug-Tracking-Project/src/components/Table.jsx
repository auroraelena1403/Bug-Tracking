import DetailItem from "./DetailItem";

const Table =({details})=>{
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {
                            ["Description", "Severity", "Assigned To", ""].map((i, index)=>(
                                <th key={index}>{i}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        details.map((detail)=>(
                            <tr key={detail.BugId}>
                                <DetailItem detail={detail}/>
                                
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table;