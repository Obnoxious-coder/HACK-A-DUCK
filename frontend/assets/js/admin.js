$.ajax({
    url:'http://127.0.0.1:5000/leaderboard',
    success:(res)=>{
        console.log(res[0]['_id'])
        // res.forEach(cat => {
        //     $("#categoryDropdown").append(`<option value=${cat}>${cat}</option>`)
        // });
        
    }
})
// $("#sumbitQuestion").on("click",()=>{
//     var category=$("#categoryDropdown").find("option:selected").val();
//     var text=$("#")
// })

// function sumbitQuestion(){
//     $.ajax({
//         type:"POST",
//         headers:{

//         },
//         contentType: 'application/json; charset=utf-8',
//         data:{
//             category:
//         },
//         url:'http://127.0.0.1:5000/admin',
//         success:(res)=>{
//             console.log(res)
//             res.forEach(cat => {
//                 $("#categoryDropdown").append(`<option value=${cat}>${cat}</option>`)
//             });
            
//         }
//     }) 
// }