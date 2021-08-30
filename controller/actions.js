const Action = require("../models/actions");
const Channel = require("../models/channel");

async function createAction(req, res) {
  try {
    const { action_type, target, channelArray } = req.body;

    const channelObjs = [];

    for (var i = 0; i < channelArray.length; i++) {
      const item = channelArray[i];

      let channel = new Channel({
        channel_type: item.channel_type,
        cost: item.cost,
        volumn: item.volumn,
      });

      channelObjs.push(await channel.save());
    }

    const action = new Action({
      action_type: action_type,
      target: target,
      channels: channelObjs,
    });

    const actionobject = await action.save();

    res.status("200").send(actionobject);
  } catch (err) {
    res.send(err.message);
  }
}

async function deleteAction(req, res){
  try{
        const { id } = req.params;
        const actions = await Action.findOne({ _id: id });
        const channels = actions.channels;
        if(channels.length){
            for (var i = 0; i < channels.length; i++) {
              const id = channels[i];
              await Channel.findByIdAndDelete({ _id: id });
           }
        }
        

        await Action.findByIdAndDelete({ _id: id });
        
        res.status(200).send("Successfully Delete Action");
  }
  catch(err) {
        res.send({message:err.message})
  }
}

async function updateAction(req,res){
    try{

        const {action_type, target,channelArray} = req.body
        const { id } = req.params;
        
        const actionobj = await Action.findOne({ _id: id });
        
        for (var i = 0; i < channelArray.length; i++) {
            const item = channelArray[i];
            const channelNewValues = { $set: {channel_type: item.channel_type, volumn: item.volumn, cost:item.cost } };
 
            await Channel.updateOne({ _id: actionobj.channels[i] }, channelNewValues);
        }

        const actionNewValues = { $set: {action_type: action_type, target: target } };

        const action = await Action.updateOne({_id:id},actionNewValues)

        res.status("200").json({message:"Updated Successfully", action})

    }
    catch(err){
        res.send({message:err.message})
    }
}

module.exports = { createAction, deleteAction, updateAction };
