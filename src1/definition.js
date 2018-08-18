// Copyright 2018 Robin He. All Rights Reserved.

/**
 * @fileoverview Description of file: it is class definition for XinBot simulation
 * its uses and information about its dependencies with nothing special.
 * @author robinhex@dingtalk.com (Robin He)
 */

'use strict';

/**
 * Class making something fun and easy.
 * @param {string} arg1 An argument that makes this more interesting.
 * @param {Array.<number>} arg2 List of numbers to be processed.
 * @constructor
 * @extends {goog.Disposable}
 */

class Campus {
    constructor(id, name, address, postalCode, size, longitude, latitude, contact, grade) {
        this.id;
        this.name;
        this.address;
        this.postalCode; // Mark: the postcode is tree model. use 000 present all.
        this.size;
        this.longitude;
        this.latitude;
        this.contact;
        this.grade;
    }
}

class XinBoxSite {
    constructor(id, identifier, postalCode, longitude, latitude, size, capacity) {
        this.id;
        this.identifier;
        this.postalCode;
        this.longitude;
        this.latitude;
        this.size;
        this.capacity;
    }
}

class XinRobot {
    constructor(id, identifier, status, longitude, latitude, fromSite, toSite, timeToNextSite, currentXinBoxId, tartgetXinBoxStatus) {
        this.id;
        this.identifier;
        this.status;
        this.longitude;
        this.latitude;
        this.fromSite;
        this.toSite;
        this.timeToNextSite;
        this.currentXinBoxId;
        this.tartgetXinBoxStatus;
    }
}


module.exports = class XinBox {
    constructor(id, status, identifier, managedBy, latestLongitude, latestLatitude, roomCount, roomLayout, homeSite, originSite, previousSite, currentSite, nextSite, passbySite, timeToPick, timeToNextSite, waitingTime) {
        this.id;
        this.status;
        this.identifier;
        this.managedBy;
        this.longitude;
        this.latitude;
        this.roomCount;
        this.roomLayout;  // predefined: 1 as one; 2 as upper and lower; 3 as upper, middler, lower 
        this.homeSite; //xinboxSiteId
        this.originSite;
        this.previousSite;
        this.currentSite;
        this.nextSite;
        this.passbySites; // It is a List.
        this.timeToPick;
        this.timeToNextSite;
        this.waitingTime;
    }
    // this is called as Functional Programming to refine the class definition.
    readyForMove() {
        this.status = 'readyformove';
    }
    readyForLoad() {
        this.status = 'readyforload';
    }
    isEmpty() {
        return this.status === 'readyforload';
    }
}

module.exports = class XinBoxRoom {
    constructor(id, roomStatus, doorStatus, ofXinboxId) {
        this.id;
        this.roomStatus;
        this.doorStatus;
        this.ofXinboxId;
    }
    open() {
        this.doorStatus = 'open';
    }
    close() {
        this.doorStatus = 'closed';
    }
    isOpen() {
        return this.door.Status === 'open';
    }
    load() {
        this.roomStatus = 'loaded';
    }
    unload() {
        this.roomStatus = 'empty';
    }
    isEmpty() {
        return this.roomStatus === 'empty';
    }
}

// class XinboxDoor {
//     constructor() {
//         this.id;
//         this.status;
//         this.ofXinboxId;
//         // From Left to right, from up to down. 
//         // Consider with grid_layout and grid_count together.
//         // ofXinboxSubslotID = 1 means the up-left grid in 'this' xinBox.
//         this.ofXinboxSlotId;
//     }
//     open() {
//         this.status = 'open';
//     }
//     close() {
//         this.status = 'closed';
//     }
//     isOpen() {
//         return this.status === 'open';
//     }
// }

module.exports = class Poppetry {
    constructor(id, senderName, senderId, senderContact, senderAddress, senderPostalCode, senderPostalCode0, senderPostalCode1, receiverName, receiverId, receiverContact, receiverAddress, receiverPostalCode, receiverPostalCode0, receiverPostalCode1, priority, shipperName, shipperBarCode) {
        // We care about 1. receiver_contact 2. receiver_address 
        this.id = id;
        this.senderName = senderName;
        this.senderId = senderId;
        this.senderContact = senderContact;
        this.senderAddress = senderAddress;
        this.senderPostalCode = senderPostalCode; // HD code. Not national postcode.
        this.senderPostalCode0 = senderPostalCode0; // National Postcode.
        this.senderPostalCode1 = senderPostalCode1; // Shipper Postcode.
        this.receiverName = receiverName;
        this.receiverId = receiverId;
        this.receiverContact= receiverContact;
        this.receiverAddress = receiverAddress;
        this.receiverPostalCode = receiverPostalCode; // HD code. Not national postcode.
        this.receiverPostalCode0 = receiverPostalCode0; // National Postcode.
        this.receiverPostalCode1 = receiverPostalCode1; // Shipper Postcode.
        this.priority = priority;
        this.shipperName = shipperName;
        this.shipperBarCode= shipperBarCode;
    }
    updatesStatus() {
    }
}


/**
 * Converts text to some completely different text. (For Methods.)
 * @param {string} arg1 An argument that makes this more interesting.
 * @return {string} Some return value.
 */

 /**
 * Operates on an instance of MyClass and returns something. (For Functions)
 * @param {project.MyClass} obj Instance of MyClass which leads to a long
 *     comment that needs to be wrapped to two lines.
 * @return {boolean} Whether something occured.
 */

