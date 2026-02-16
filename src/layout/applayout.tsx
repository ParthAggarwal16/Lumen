// wraps entire app 
// renders sidebar, header and main content
// handles routing via main switch

function MyButton ({ title } : {title : string}){
    return (
        <button> {title} </button>
    );
}

export default function MyApp(){
    return (
        <div>
            <h1> Welcome to my app </h1>
            <MyButton title = "I am a button"/>
        </div>
    );
}