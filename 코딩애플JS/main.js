
// window.addEventListener('scroll',function(){
//     this.window.scrollY
//     강제로 스크롤하기
//     this.window.scrollTo(0,100);
// })

// 로고 크기변경
$(window).on('scroll',function(){
    // 현재 얼마나 스크롤했는지 
    let scroll_X = $(window).scrollTop();
    if(scroll_X >= 100){
        $('.header_logo').css('font-size','20px')
    }else if(scroll_X <= 100){
        $('.header_logo').css('font-size','50px')
    }
})

// div의 실제 높이 == div의 스크롤바 내린 양 + 눈에 보이는 div의 높이
/* scroll 사용시 주의
    1.scroll 이벤트리스너 안의 코드는 1초에 60번이상 실행
    2.바닥체크도 여러번 중복으로 할수 있다.(방지)
*/
// document.querySelector('html') ==  document.documentElement

// 페이지 끝까지 도달하면 알림
// $(window).on('scroll',function(){
//     let scroll_height = document.querySelector('html').scrollTop; // 스크롤한 양
//     // scrollHeight는 페이지 로드완료시 실행해야 정확하게 동작한다.
//     let html_height = document.querySelector('html').scrollHeight;//현재 페이지 높이
//     let current_height = document.querySelector('html').clientHeight;//페이지 보이는 부분 높이
//     if(scroll_height + current_height >= html_height - 10){
//         alert('페이지 끝~')
//     }   
// })

// header scroll내릴때마다 페이지를 얼마나 읽었는지 진척도 알려주는 UI
window.addEventListener('scroll', function() {
    var header = document.querySelector('.header');
    var progressBar = header.querySelector('.progress-bar');
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (window.scrollY / height) * 100;
    progressBar.style.width = scrolled + '%';
    if (scrolled == 0) {
      header.classList.remove('active');
    }
  });



// fadeOut   slideUp
        // 일정시간 후에 실행
        // setTimeout(banner,1000)
        // function banner(){
        //     $('.small_banner').slideUp();
        // }

        // 일정시간 마다 실행
        // setInterval(function(){
        //     $('.small_banner').slideToggle();
        // },1000)
       
        // clearTimeout(변수) : 변수 =setInterval(){} 
        var aa = 5;       
        let small_banner = setInterval(function(){
            aa -= 1;       
          if(aa >=1){           
           document.querySelector('#small_banner_num').innerHTML = aa;
            }
            else{
                $('.small_banner').slideUp();
                // clearTimeout(small_banner)
            }
        },1000);
        
// 탭버튼
        // 공통으로 클래스 초기화해주는 부분은 밖에 선언
        $('.tab-button').on('click', function () {
            // 탭이 추가되도 가능
            let Repeat_number = $('.tab-button').length;
            $('.tab-button').removeClass('orange');
            $('.tab-content').removeClass('show');
            for (let i = 0; i < Repeat_number; i++) {
                $('.tab-button').eq(i).on('click', function () {
                    $('.tab-button').eq(i).addClass('orange');
                    $('.tab-content').eq(i).addClass('show');
                })
            }
        }) 


        let count = 0;
        // 다크모드
        $('.dark_mode_btn').on('click', function () {
            $('.white-bg').toggleClass('dark_mode')

            count++;
            if(count % 2 == 1){
                $('.dark_mode_btn').html('Light')
                $('.dark_mode_btn').addClass('white-mode')
            }else{
                $('.dark_mode_btn').html('dark')
                $('.dark_mode_btn').removeClass('white-mode')
            }
        });

      
        // 팝업창
        $('#close').on('click', function () {
            $('.black-bg').removeClass('show-modal')
        });
        $('.open').on('click', function () {
            $('.black-bg').addClass('show-modal')
        });

// 팝업창 검은배경 클릭시 닫기
/* 비교하기전에 자료형 확인
console.log(e.target)
console.log($('.black-bg'))
*/
        $('.black-bg').on('click', function (e) {
            if(document.querySelector('.black-bg') == e.target ){
                $('.black-bg').removeClass('show-modal');             
            }       
        });

        //form 전송시 'submit'이벤트 발생
        $('form').on('submit', function (e) {
            // 다시 입력할때 초기화 시키기
            $('.id_none').css('display', 'none');
            $('.pw_none').css('display', 'none');
            //input 공백일시 경고창
            if ($('#id_input').val() == "") {
                $('.id_none').css('display', 'block');
            }
            if ($('#pw_input').val() == "") {
                $('.pw_none').css('display', 'block');
            }

            // 이메일 형식 확인
            let email = $('#email_input').val();
            // 알파벳 + 숫자@알파벳+숫자.알파벳 + 숫자 형식
            let email_form =/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

            if (email_form.test(email)) {
                alert('맞는 이메일 형식입니다')
                
            }else{
                alert('이메일 형식을 확인하세요.')
               
            }  
            e.preventDefault();

        });



        // input의 공백제거
        function pw_test(obj) {
            var a = $('#pw_input').val().replace(/ /gi, '');
            $('#pw_input').val(a);
        }
        function id_test(obj) {
            var a = $('#id_input').val().replace(/ /gi, '');
            $('#id_input').val(a);
        } 
        function email_test(obj) {
            var a = $('#email_input').val().replace(/ /gi, '');
            $('#email_input').val(a);
        } 
        

        // 중복 클릭 막기 
        var doubleClickFlag = false;
        function mySubmit() {
            if (doubleClickFlag) {
                return;
            } else {
                doubleClickFlag = true;
                //submit처리
                setTimeout("doubleClickFlag = false;", 5000);
            }
        }


        // 글자수가 부족할때 지속적으로 안내문 띄우기
        // input : input태그에 유저가 입력한 값이 변할때 실행
        // change : 입력한 값이 바뀌고 focus를 잃을때 발생
        
        $('input').on('change', function (){
            if ($('#pw_input').val().length < 6) {
                $('.pw_length').css('display', 'block');
            } else {
                $('.pw_length').css('display', 'none');
            }

            if ($('#id_input').val().length < 6) {
                $('.id_length').css('display', 'block');
            } else {
                $('.id_length').css('display', 'none');
            }
        })

        /*
         == 
         === : 타입까지 비교
        
         || (or) : 앞 조건이 참이면 뒤의 조건은 검사하지 않는다.
        */

// carousel  :이미지 슬라이드
$('.slide_1').on('click',function(){
    $('.slide_container').css('transform','translateX(0vw)');
})
$('.slide_2').on('click',function(){
    $('.slide_container').css('transform','translateX(-100vw)');
})
$('.slide_3').on('click',function(){
    $('.slide_container').css('transform','translateX(-200vw)');
})
// 이전 다음버튼 : 슬라이드의 현재 위치값 +/-100vw
// 현재 몇번째 버튼인지 변수에 저장해서 비교
// 사진이 추가되도 상관없게 코드 수정
let next_number = 1;
let pre_number = 1;
let img_length = 3;
//다음 버튼 `${current_number}00vw`
$('.next').on('click',function(){
        $('.slide_container').css('transform','translateX(-' + next_number + '00vw)');
        next_number +=1;  
        if(img_length < next_number){
            $('.slide_container').css('transform','translateX(0vw)');
            next_number = 0;
        }
        // 클릭한 개수로 하면 이전버튼 누르면 소용x
})
//이전 버튼
$('.pre').on('click',function(){
    $('.slide_container').css('transform','translateX(+' + pre_number + '00vw)');
    pre_number +=1; 
    // 첫번째 슬라이드면 마지막 슬라이드로 이동 
    // if(  < pre_number){
    //     $('.slide_container').css('transform','translateX(0vw)');
    //     pre_number = 0;
    // }
})