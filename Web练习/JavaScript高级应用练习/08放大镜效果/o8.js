window.addEventListener('load', function () {

    var box = document.querySelector('.box');
    let sImg = document.querySelector('.smallImg');
    let sImgWidth = sImg.offsetWidth; //获取图片的宽度
    let mask = document.querySelector('.mask');
    let bigImg = document.querySelector('.bigImg');
 
    //mask.style.display = 'block';
    // console.log(sImgWidth)
    box.addEventListener('mouseover', function (e) {
        mask.style.display = 'block';
        bigImg.style.display = 'block';
        // ！！！！！注意此处事件源为box,即透明图层和图片的共同父元素，监听子元素回出现卡顿效果
        box.addEventListener('mousemove', function (e) {
            let x = e.pageX - sImg.offsetLeft - mask.offsetWidth / 2;
            let y = e.pageY - sImg.offsetTop - mask.offsetHeight / 2;
            let mask_maxlen = sImg.offsetWidth - mask.offsetWidth;  // 遮挡层移动最大距离 盒子和遮挡层都为正方形-高宽移动范围相等
            let bigImg_maxlen= bigImg.children[0].offsetWidth-bigImg.offsetWidth;      //这两行写到上面图片的offset值会出错（未知原因）             
            // 对x y的移动范围进行限制 
            x = x >= 0 ? x : 0;
            x = x <= mask_maxlen ? x : mask_maxlen
            y = y >= 0 ? y : 0;
            y = y <= mask_maxlen ? y : mask_maxlen
           // console.log( mask_maxlen);
            mask.style.top = y + 'px';
            mask.style.left = x + 'px';           
             //大图片的移动距离=遮挡层移动距离*大图片最大移动距离│遮挡层的最大移动距离
             bigImg.children[0].style.top= - (y * bigImg_maxlen / mask_maxlen)+'px';            
             bigImg.children[0].style.left= - (x *bigImg_maxlen / mask_maxlen)+'px';
        })
    })

box.addEventListener('mouseout', function () {
   // console.log('out');
    mask.style.display = 'none';
    bigImg.style.display = 'none';
})
   
})

