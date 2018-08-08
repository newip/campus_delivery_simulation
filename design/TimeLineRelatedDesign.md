在v0.1.0做好以后，出现几个疑虑：
1. XinBot的效率在模拟中看出提升有限，有可能受限于以下几个方面：
    1. 一个箱子只设置成放置一个件，不合理
    2. 为了简化模型，Bot送完一件就要回去取一件，过度奔波，不合理
2. XinBot对于复杂场景的适用性会更好，目前的模拟仅为简单的静态数据，会导致优势不明显
3. 排队模型、调度模型、分拣模型未建立，不能真实反映情境

因此，需要由以下几个改进点：
1. 建立时间相关的动态状态模拟
2. 一个箱子设置为3个Slot
3. 箱子的格口、数量、bot数量均为可以设置的参数，方便调整

1. 总量一样
2. 找到有等待时间的环节
3. 箱子视角，状态变化与触发
4. 对空载的调度
