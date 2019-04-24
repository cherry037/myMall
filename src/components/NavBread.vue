<template>
    <div class="nav-bread">
        <div class="bread-wrap">
            <nav>
                <a href="/">
                    Home
                </a>
                <slot></slot>
            </nav>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .nav-bread{
        height: 45px;
        line-height: 45px;
        background-color: #f0f0f0;
        .bread-wrap{
            padding: 0 10px;
            font-size:14px;
            color:#a1a1a1;
            a{
                position: relative;
                margin-right:20px;
            }
            a:after{
                position: absolute;
                top:0px;
                content: '/';
                height: 20px;
                line-height: 20px;
            }
            span{
                color:#d1434a;
            }
        }
    }
</style>

