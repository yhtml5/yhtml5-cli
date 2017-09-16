<template lang="wxml">
    <!-- wx:if="{{show}}" -->
    <view class="picker {{show ? 'show':'hide'}}">
        <view wx:if="{{show}}" class="picker-content">
            <view class="picker-header">
                <view class="y-left" @tap="cancel">取消</view>
                <view class="y-right" @tap="confirm">确定</view>
            </view>
            <picker-view class="picker-view" indicator-class="picker-view-indicator" value="{{index}}" bindchange="bindChange">
                <picker-view-column>
                    <view wx:for="{{dates}}" wx:key="{{index}}" class="picker-view-colum">{{item}}</view>
                </picker-view-column>
                <picker-view-column>
                    <view wx:for="{{times}}" wx:key="{{index}}" class="picker-view-colum">{{item}}</view>
                </picker-view-column>
            </picker-view>
            <slot></slot>
        </view>
    </view>
    <!-- <view class="picker-backdrop {{show ? 'show':'' }}" @tap="cancel" ></view>
    transition: all 1s;
    opacity: 0; -->
    <view wx:if="{{show}}" @tap="cancel" class="picker-backdrop"></view>
</template>

<script>
    import wepy from 'wepy';
    // import Child from './child';

    export default class extends wepy.component {
        components = {
            // child: Child
        }
        data = {
            // classShow: false,
        }
        props = {
            datas: Object,
            index: Array,
            show: Boolean,
            classShow: Boolean
        }
        methods = {
            bindChange: function (e) {
                const val = e.detail.value // [dates , times]
                this.index = val
                // console.log('methods.bindChange', val)
            },
            cancel() {
                console.log('methods.cancel')
                this.$emit('toggleTakeoutPicker', false)
            },
            confirm() {
                // wait for bingChange
                setTimeout(() => {
                    this.$emit('selectTakoutPickerIndex', this.index)
                    this.$emit('toggleTakeoutPicker', false)
                }, 500)
            }
        }
        computed = {
            dates() {
                const keys = Object.keys(this.datas)
                return this.translateName(keys)
            },
            times() {
                const keys = Object.keys(this.datas)
                const _times = this.datas[keys[this.index[0]]]
                // console.log('computed.this.datas', this.datas, this.index)
                // console.log('computed.times', keys, _times)
                return _times
            }
            // classShow() {
            // this.classShow = this.show
            // for (let i = 0; i < 9999; i++) {
            //     console.log('await')
            // }
            // console.log('methods.classShow', this.classShow, this.show)
            // return false
            // }
        };
        watch = {
            // show(newValue, oldValue) {
            //     if (newValue) {
            //         setTimeout(() => {
            //             console.log('watch.show', newValue, oldValue)
            //             this.classShow = newValue;
            //             this.$apply();
            //         }, 300);
            //     }
            // }
        }
        event = {
            // 'toggle': (bool) => {
            //     this.show = bool
            // }
        }
        onLoad() {
            // const keys = Object.keys(this.datas)
            // console.log('onLoad', this)
        }
        translateName(array = []) {
            return array.map((value, index) => {
                if (value === 'today') {
                    return '今天'
                } else if (value === 'tomorrow') {
                    return '明天'
                } else {
                    return value
                }
            })
        }
    }

</script>

<style lang="css">
    .picker {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1050;
        overflow: hidden;
        outline: 0;
        transition: -webkit-transform 0.3s ease-out;
        transition: transform 0.3s ease-out;
        transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
        /* -webkit-transform: translate(0, 50%);
    transform: translate(0, 50%);
    visibility: hidden; */
    }

    .picker.show {
        -webkit-transform: translate(0, 0);
        transform: translate(0, 0);
        visibility: visible;
    }

    .picker.hide {
        -webkit-transform: translate(0, 50%);
        transform: translate(0, 50%);
        visibility: hidden;
    }

    .picker-content {
        height: 50%;
        position: absolute;
        width: 100%;
        bottom: 0;
        background: #fff;
        text-align: center;
    }

    .picker-view {
        width: 100%;
        height: 300px;
    }

    .picker-view-colum {
        line-height: 50px
    }

    .picker-view-indicator {
        height: 50px;
    }

    .picker-header {
        border-top: 1px solid #e9ecef;
        border-bottom: 1px solid #e9ecef;
    }

    .picker-header view {
        display: inline-block;
        padding: 4px 20px;
        width: 50%
    }

    .picker-header .y-left {
        text-align: left;
        color: #999;
    }

    .picker-header .y-right {
        text-align: right;
        color: #0bb20c;
    }

    .picker-backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1040;
        background-color: #000;
        opacity: 0.5;
    }

</style>
