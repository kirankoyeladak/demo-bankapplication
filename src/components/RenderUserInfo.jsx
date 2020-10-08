export function RenderUserInfo(state, val) {
    if(val!== undefined){
        return (
            state.name.toLowerCase().indexOf(val.toLowerCase()) !== -1
        );
    }
}