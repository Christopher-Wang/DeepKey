<template>
  <div>
    <h1>Create a Typing Sample</h1>
    <form @submit.prevent="addTypingSample" v-on:keydown.enter="addTypingSample" name="sample-form" >
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
                <label>Sample number:</label><span>&nbsp;{{sampleNumber}}</span><br/>
                <span v-for="(char, index) in prompt" :key="index" v-bind:class="char.status">{{char.char}}</span>
            </div>
          </div>
        </div><br/>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <textarea class="form-control" 
                v-model="sample.body" rows="5" 
                v-on:keydown="pushKeyEvent" 
                v-on:keyup="pushKeyEvent"
                />
            </div>
          </div>
        </div><br/>
        <div class="form-group">
            <input type="radio" id="drunk" value="drunk" v-model="sample.label">
            <label for="drunk">&nbsp;Drunk</label>&emsp;
            <input type="radio" id="sober" value="sober" v-model="sample.label">
            <label for="sober">&nbsp;Sober</label>
        </div><br/>
        <div class="form-group">
          <button class="btn btn-primary">Create</button>
        </div>
    </form>
  </div>
</template>

<script>
    const STATUS = {
        PENDING: "pending",
        CORRECT: "correct",
        MISTAKE: "mistake"
    };

    export default {
        data: function(){
            return {
                sampleNumber: 0,
                sample: {
                    body: "",
                    keyEvents: [],
                    label: "sober"
                }
            }
        },
        computed: {
            prompt: function (){
                let promptSentence = "The quick brown fox jumps over the lazy dog";
                let promptArray = [];
                for (let i = 0; i < promptSentence.length; i++){
                    promptArray[i] = {
                        char: promptSentence[i],
                        status: STATUS.PENDING
                    };
                }
                return promptArray;
            },
            body: function () {return this.sample.body;}
        },
        watch:{
            body: function(){
                if (this.body.length <= this.prompt.length){
                //Change colour of the prompt
                for (let i = 0; i < this.body.length; i++){
                        this.prompt[i].status = (this.body[i] == this.prompt[i].char) ? STATUS.CORRECT: STATUS.MISTAKE;
                }
                //Reset colour on backspace
                    for (let i = this.body.length; i < this.prompt.length; i++) { 
                        this.prompt[i].status = STATUS.PENDING;
                    }
                }
                //Reset the keyEvents if the textbox is reset
                if (this.body.length==0){
                    this.sample.keyEvents = [];
                }
            }
        },
        methods: {
            addTypingSample: function (){
                let url = "http://localhost:4000/addSample";
                let body = this.sample;
                this.axios.post(url, body).then(() => {
                    this.sample = {
                        body: "",
                        keyEvents: [],
                        label: "sober"
                    };
                    this.sampleNumber++;
                    return false; 
                });
            },
            pushKeyEvent: function(keyBoardEvent){
                if (keyBoardEvent.key == "Enter" || keyBoardEvent.key == "Control") { return }
                let keyEvent = {
                        eventTime: performance.now(),
                        eventType: keyBoardEvent.type,
                        altKey: keyBoardEvent.altKey,
                        code: keyBoardEvent.code,
                        ctrlKey: keyBoardEvent.ctrlKey,
                        isComposing: keyBoardEvent.isComposing,
                        key: keyBoardEvent.key,
                        locale: keyBoardEvent.locale,
                        location: keyBoardEvent.key,
                        metaKey: keyBoardEvent.metaKey,
                        repeat: keyBoardEvent.repeat,
                        shiftKey: keyBoardEvent.shiftKey,
                    };
                this.sample.keyEvents.push(keyEvent);
            }
        }
  }
</script>

<style scoped>
    .pending {
        white-space: pre;
        color: gray;
    }
    .correct {
        white-space: pre;
        color: green;
    }
    .mistake{
        white-space: pre;
        color: red;
    }
</style>