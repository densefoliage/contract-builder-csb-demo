const initialXml = `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="smart_contract" x="0" y="0">
    <field name="name">Smart Contract Builder Test</field>
    <field name="authors">Joe, Dave and Ella</field>
    <statement name="objects">
      <block type="comment">
        <field name="content">All the entities (users and objects in the system) go here.</field>
        <next>
          <block type="object">
            <field name="name">Sender</field>
            <field name="description">The sender of a parcel.</field>
            <next>
              <block type="object">
                <field name="name">Courier</field>
                <field name="description">A bicycle courier.</field>
                <next>
                  <block type="object">
                    <field name="name">Recipient</field>
                    <field name="description">The recipient of the parcel.</field>
                    <next>
                      <block type="object">
                        <field name="name">Receptionist</field>
                        <field name="description">The receptionist of the recipient's building.</field>
                        <next>
                          <block type="object">
                            <field name="name">Parcel</field>
                            <field name="description">The parcel in question.</field>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
    <statement name="contract-code">
      <block type="contract_section">
        <field name="name">Starting Off</field>
        <statement name="children">
          <block type="comment">
            <field name="content">Courier accepts contract and other participants are notified.</field>
            <next>
              <block type="if_this_do_that">
                <statement name="preconditions">
                  <block type="does">
                    <field name="target">Courier</field>
                    <field name="action">accept contract</field>
                  </block>
                </statement>
                <statement name="code">
                  <block type="message">
                    <field name="target">Courier</field>
                    <field name="content">Thank you for accepting the contract.</field>
                    <next>
                      <block type="message">
                        <field name="target">Sender, Recipient</field>
                        <field name="content">Courier has accepted contract.</field>
                        <next>
                          <block type="custom_action">
                            <field name="target">Sender</field>
                            <field name="action">put payment into escrow.</field>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </statement>
              </block>
            </next>
          </block>
        </statement>
        <next>
          <block type="contract_section">
            <field name="name">Pick Up</field>
            <statement name="children">
              <block type="comment">
                <field name="content">Courier collects the parcel from the sender.</field>
                <next>
                  <block type="if_else">
                    <statement name="preconditions">
                      <block type="is_near">
                        <field name="target">Sender</field>
                        <field name="location">home</field>
                      </block>
                    </statement>
                    <statement name="if_code">
                      <block type="message">
                        <field name="target">Sender</field>
                        <field name="content">Please wait for courier at home.</field>
                        <next>
                          <block type="message">
                            <field name="target">Courier</field>
                            <field name="content">Collect parcel from sender's home.</field>
                          </block>
                        </next>
                      </block>
                    </statement>
                    <statement name="else_code">
                      <block type="message">
                        <field name="target">Sender</field>
                        <field name="content">Please wait for courier at meeting point A.</field>
                        <next>
                          <block type="message">
                            <field name="target">Courier</field>
                            <field name="content">Collect parcel from meeting point A.</field>
                          </block>
                        </next>
                      </block>
                    </statement>
                  </block>
                </next>
              </block>
            </statement>
            <next>
              <block type="contract_section">
                <field name="name">Courier Travel</field>
                <statement name="children">
                  <block type="if_this_do_that">
                    <statement name="preconditions">
                      <block type="comment">
                        <field name="content">What is courier loses package?</field>
                        <next>
                          <block type="is_far">
                            <field name="target">Courier</field>
                            <field name="location">Package</field>
                          </block>
                        </next>
                      </block>
                    </statement>
                    <statement name="code">
                      <block type="message">
                        <field name="target">Courier</field>
                        <field name="content">Have you misplaced the parcel?</field>
                        <next>
                          <block type="if_this_do_that">
                            <statement name="preconditions">
                              <block type="does">
                                <field name="target">Courier</field>
                                <field name="action">confirm loss</field>
                              </block>
                            </statement>
                            <statement name="code">
                              <block type="message">
                                <field name="target">Sender</field>
                                <field name="content">The parcel has been lost in transit. Please contact the courier.</field>
                              </block>
                            </statement>
                          </block>
                        </next>
                      </block>
                    </statement>
                  </block>
                </statement>
                <next>
                  <block type="contract_section">
                    <field name="name">Courier Arrives</field>
                    <statement name="children">
                      <block type="comment">
                        <field name="content">Courier's arrival to destination.</field>
                      </block>
                    </statement>
                    <next>
                      <block type="contract_section">
                        <field name="name">Hand Over</field>
                        <statement name="children">
                          <block type="comment">
                            <field name="content">Package is handed over to recipient/receptionist.</field>
                          </block>
                        </statement>
                        <next>
                          <block type="contract_section">
                            <field name="name">Payment</field>
                            <statement name="children">
                              <block type="comment">
                                <field name="content">Money is moved to correct people.</field>
                                <next>
                                  <block type="custom_action">
                                    <field name="target">Courier and Sender</field>
                                    <field name="action">get paid.</field>
                                  </block>
                                </next>
                              </block>
                            </statement>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
  </block>
  <block type="comment" x="801" y="5">
    <field name="content">Hello! Welcome to the contract builder demo.</field>
    <next>
      <block type="comment">
        <field name="content">Please find an example of a contract in. </field>
        <next>
          <block type="comment">
            <field name="content">mid-construction. Please have a go at editing</field>
            <next>
              <block type="comment">
                <field name="content">it and let me know how you get on.</field>
                <next>
                  <block type="comment">
                    <field name="content">-</field>
                    <next>
                      <block type="comment">
                        <field name="content">This blocky workspace doesn't compile code</field>
                        <next>
                          <block type="comment">
                            <field name="content">as I added a bunch of WIP blocks which do </field>
                            <next>
                              <block type="comment">
                                <field name="content">not have their code generation functions </field>
                                <next>
                                  <block type="comment">
                                    <field name="content">finished yet.</field>
                                    <next>
                                      <block type="comment">
                                        <field name="content">-</field>
                                        <next>
                                          <block type="comment">
                                            <field name="content">You can save your contract by copying the text</field>
                                            <next>
                                              <block type="comment">
                                                <field name="content">below the editor that starts with "&lt;xml" and </field>
                                                <next>
                                                  <block type="comment">
                                                    <field name="content">ends with "&lt;/xml&gt;" and pasting this into a word</field>
                                                    <next>
                                                      <block type="comment">
                                                        <field name="content">document.</field>
                                                      </block>
                                                    </next>
                                                  </block>
                                                </next>
                                              </block>
                                            </next>
                                          </block>
                                        </next>
                                      </block>
                                    </next>
                                  </block>
                                </next>
                              </block>
                            </next>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`;

export default initialXml;