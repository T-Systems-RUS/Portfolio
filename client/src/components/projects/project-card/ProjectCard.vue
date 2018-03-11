<template>
    <div class="project-card is-clickable">
        <div class="project-card-header is-centered is-uppercase">
            {{project.line}}
        </div>
        <div class="project-card-body">
            <h6 class="project-card-title">
                {{ project.name }}
            </h6>
            <div class="is-secondary">
                {{ project.domain }}
            </div>
            <div class="project-card-description">
                {{ project.description }}
            </div>
        </div>
        <div class="project-card-footer">
            <div class="project-card-team">
                <img src="../../root/assets/team.svg" alt="">
                <span>{{ project.teamcount }}</span>
            </div>
            <div class="is-secondary">
                {{ project.updatedAt | date }}
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {IProject} from '../../../shared/interfaces/project'; 

    export default Vue.extend({
        props:{
            project: {
                type: IProject,
                required: true
            }
        },
        computed: {
            teamcount() {
                return this.project.schedules.length;
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '../../../styles/variables';

    $header-height:35px;
    $padding: 17px;

    .project-card{
        display: inline-block;
        line-height: 1;
        margin: 0 20px 20px 0;
        height: 245px;
        position: relative;
        width:230px;
        box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.5);
        vertical-align: top;

        &.is-clickable{
            cursor: pointer;
        }

        .is-secondary{
            color: $text-secondary;
            font-weight: 500;
            font-size: 12px;
        }

        &-header{
            background-color: $magenta;
            color: $white;
            font-size: 16px;
            font-weight: 900;
            height: $header-height;
            margin-bottom: 20px;
            padding: 0 $padding;
            

            &.is-centered{
                line-height: $header-height;
                vertical-align: middle;
            }
        }

        &-body{
            padding: 0 $padding;
            max-height: 125px;
            overflow: hidden;
        }

        &-title{
            font-size: 16px;
            font-weight: 900;
            margin-bottom: 3px;
        }

        &-footer{
            padding: 0 $padding;
            position: absolute;
            bottom: 10px;
        }

        &-team{
            font-size: 19px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        &-description{
            font-size: 14px;
            color: $text-color;
            margin-top: 24px;
        }
    }
</style>