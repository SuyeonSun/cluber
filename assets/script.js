var commentbtn = document.getElementById('commentBtn');
if(commentbtn){
    commentbtn.addEventListener('click', function(){

        const username = document.getElementById('username').value;
        const text = document.getElementById('text').value;
        const board_id = document.getElementById('board_id').value; // ############
    
        fetch('/community/add', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ // JSON 문자열로 변환하기 위해, JSON.stringfy 형식으로 받아오기
                username: username,
                text:text,
                board_id:board_id, // ############
            }) // 요청
        }).then(function(res){ // res 주면 @@@@ 응답 한번 주면 그 다음 코드 진행 안함
            console.log(res); //res는 http 통신 요청과 응답에서 응답의 정보를 담고 있는 객체
            // but 실제 백엔드에서 넘겨주는 body는 보이지 않는다.
            return res.json(); 
            // 응답으로 받는 JSON 데이터를 사용하기 위해서는 Response Object 의 json 함수를 호출하고, return 해야합니다. 그러면 두 번째 then 함수에서 응답 body의 데이터를 받을 수 있습니다.
        }).then(function(data){
            // console.log(data);
            if(data.success == 1) {
               alert(data.message);
               return;
           }
            else if(data.success == -1) {
            alert('fail');
            return;
        }}) 
    });
}

var commentbtn2 = document.getElementById('commentBtn2');
if(commentbtn2){
    commentbtn2.addEventListener('click', function(){

        const username = document.getElementById('username').value;
        const text = document.getElementById('text').value;
        const post_id = document.getElementById('post_id').value; // ############
    
        fetch('/posts/add2', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ // JSON 문자열로 변환하기 위해, JSON.stringfy 형식으로 받아오기
                username: username,
                text:text,
                post_id:post_id, // ############
            }) // 요청
        }).then(function(res){ // res 주면 @@@@ 응답 한번 주면 그 다음 코드 진행 안함
            console.log(res); //res는 http 통신 요청과 응답에서 응답의 정보를 담고 있는 객체
            // but 실제 백엔드에서 넘겨주는 body는 보이지 않는다.
            return res.json(); 
            // 응답으로 받는 JSON 데이터를 사용하기 위해서는 Response Object 의 json 함수를 호출하고, return 해야합니다. 그러면 두 번째 then 함수에서 응답 body의 데이터를 받을 수 있습니다.
        }).then(function(data){
            // console.log(data);
            if(data.success == 1) {
               alert(data.message);
               return;
           }
            else if(data.success == -1) {
            alert('fail');
            return;
        }}) 
    });
}